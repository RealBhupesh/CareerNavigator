from flask import Flask, request, jsonify
import re
from collections import Counter


app = Flask(__name__)
app.config.update(APP_NAME="Anushka Career Navigator")
app.config["LAST_PROFILE"] = {"name": "", "role": "", "skills": []}


class StripPrefixMiddleware:
    """WSGI middleware to strip a leading URL prefix (e.g., '/pyapi').

    Useful on Vercel where rewrites may forward the original path like '/pyapi/health'
    to the Python function. Locally, the path is already stripped by Next.js dev proxy.
    """

    def __init__(self, app, prefix: str):
        self.app = app
        self.prefix = prefix.rstrip("/")

    def __call__(self, environ, start_response):
        path = environ.get("PATH_INFO", "")
        if path.startswith(self.prefix + "/") or path == self.prefix:
            new_path = path[len(self.prefix):] or "/"
            environ["PATH_INFO"] = new_path
        return self.app(environ, start_response)


# In serverless (Vercel), incoming path may include '/pyapi' from rewrite
app.wsgi_app = StripPrefixMiddleware(app.wsgi_app, "/pyapi")


def parse_skills(skills_text: str) -> list[str]:
    return [s.strip().lower() for s in skills_text.split(",") if s.strip()]


def analyze_profile(role: str, skills: list[str]) -> dict:
    suggestions: list[str] = []
    normalized_role = role.lower()
    if "data" in normalized_role:
        suggestions += [
            "Strengthen Python, SQL, and Pandas.",
            "Add projects: EDA, dashboards, A/B tests.",
        ]
    if "frontend" in normalized_role or "web" in normalized_role:
        suggestions += [
            "Practice HTML/CSS/JS; build responsive UIs.",
            "Add projects using fetch/REST and forms.",
        ]
    if not suggestions:
        suggestions = [
            "Quantify impact in your projects (metrics, %).",
            "Write clear README and deploy demos.",
        ]
    focus_gaps = []
    wanted = {"python", "sql", "git", "linux"}
    for w in wanted:
        if w not in skills:
            focus_gaps.append(w)
    return {"suggestions": suggestions, "gaps": focus_gaps}


def extract_keywords(text: bytes, top_k: int = 10) -> list[str]:
    try:
        s = text.decode("utf-8", errors="ignore")
    except Exception:
        s = str(text)
    words = [w.lower() for w in re.findall(r"[a-zA-Z]{3,}", s)]
    stop = {
        "the","and","for","with","from","that","this","you","your","are","was","were","have","has","our","not","but",
        "skill","skills","project","projects","work","experience","using","use","used","also","will","can","able"}
    words = [w for w in words if w not in stop]
    counts = Counter(words)
    return [w for w, _ in counts.most_common(top_k)]



@app.get("/health")
def healthcheck():
    return jsonify({"status": "ok"})


@app.get("/")
def home():
    return jsonify({"message": "Anushka Career Navigator API", "status": "running"})


@app.get("/profile")
def profile_form():
    return jsonify({"message": "Profile form endpoint", "saved": False})


@app.post("/profile")
def save_profile():
    # Handle both form data and JSON
    if request.is_json:
        data = request.get_json()
        name = data.get("name", "")
        role = data.get("role", "")
        skills_text = data.get("skills", "")
    else:
        name = request.form.get("name", "")
        role = request.form.get("role", "")
        skills_text = request.form.get("skills", "")
    
    skills = parse_skills(skills_text)
    analysis = analyze_profile(role, skills)
    profile_data = {"name": name, "role": role, "skills": skills}
    app.config["LAST_PROFILE"] = profile_data
    
    return jsonify({
        "saved": True,
        "data": profile_data,
        "analysis": analysis
    })


@app.get("/resume")
def resume_upload():
    return jsonify({"message": "Resume upload endpoint", "uploaded": False})


@app.post("/resume")
def handle_resume():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded", "uploaded": True}), 400
    
    content = file.read(40000)  # read a chunk
    keywords = extract_keywords(content, top_k=12)
    summary = f"Uploaded file '{file.filename}' with {len(content)} bytes (sampled)."
    
    # naive score: overlap with last profile skills
    profile = app.config.get("LAST_PROFILE", {})
    profile_skills = set(profile.get("skills", []))
    overlap = profile_skills.intersection(set(keywords))
    score = int(100 * (len(overlap) / max(1, len(profile_skills) or 6)))
    
    return jsonify({
        "uploaded": True,
        "summary": summary,
        "keywords": keywords,
        "score": score
    })


@app.get("/jobs")
def list_jobs():
    jobs = [
        {"title": "Frontend Developer", "company": "Acme", "location": "Remote", "skills": ["javascript","html","css","react"]},
        {"title": "Backend Developer", "company": "Globex", "location": "NYC", "skills": ["python","sql","api","linux"]},
        {"title": "Data Analyst", "company": "Initech", "location": "SF", "skills": ["sql","python","excel","pandas"]},
    ]
    profile = app.config.get("LAST_PROFILE", {})
    user_skills = set(profile.get("skills", []))
    enriched = []
    for j in jobs:
        req = set(j["skills"])  # type: ignore
        overlap = user_skills.intersection(req)
        relevance = int(100 * (len(overlap) / max(1, len(req))))
        enriched.append({**j, "relevance": relevance, "overlap": sorted(list(overlap))})
    enriched.sort(key=lambda x: x["relevance"], reverse=True)
    
    return jsonify({
        "jobs": enriched,
        "profile": profile
    })


@app.get("/interview")
def interview_page():
    return jsonify({"message": "Interview endpoint", "answer": None})


@app.post("/interview")
def interview_answer():
    # Handle both form data and JSON
    if request.is_json:
        data = request.get_json()
        question = data.get("question", "")
    else:
        question = request.form.get("question", "")
    
    answer = f"Sample answer to: '{question}'. Prepare with STAR method and quantify impact."
    
    return jsonify({
        "answer": answer,
        "question": question
    })


if __name__ == "__main__":
    # Running via: python backend/main.py
    app.run(host="127.0.0.1", port=8000, debug=True)


