# Anushka Career Navigator (Python - Flask)

Simple Flask + Jinja2 web app for demonstrating career navigation features.

## Run (Windows PowerShell)

```powershell
python -m venv .venv
. .venv/Scripts/Activate.ps1
pip install -U pip
pip install -r backend/requirements.txt
python backend/main.py
```

Open the app: http://127.0.0.1:8000/

## Deploy to Vercel (Python)
- Ensure you have a Vercel account and CLI (optional): `npm i -g vercel`
- Files for Vercel:
  - `api/index.py` — exposes the Flask app
  - `vercel.json` — routes all paths to the Python function
  - `requirements.txt` — Python deps for Vercel
- Deploy steps:
  1) Commit your changes
  2) Run `vercel --name anushkacareernavigator`
  3) Run `vercel --prod`
  4) Open the URL (e.g., https://anushkacareernavigator.vercel.app/)

## Features
- Home navigation to pages
- Profile form (in-memory)
- Resume upload (file preview)
- Jobs list (static examples)
- Interview Q&A (sample answer)

## Project Structure
- backend/main.py — Flask routes
- backend/templates/ — Jinja2 HTML templates
- backend/requirements.txt — Python dependencies

## Notes
- Keep it simple for interviews. Extend later with DB/auth as needed.
