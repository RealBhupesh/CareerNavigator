# Career Navigator (Python - Flask)

Simple Flask + Jinja2 app for interview demos.

## Run (Windows PowerShell)

```powershell
python -m venv .venv
. .venv/Scripts/Activate.ps1
pip install -U pip
pip install -r backend/requirements.txt
python backend/main.py
```

Open: http://127.0.0.1:8000/

## Pages
- / → Home
- /profile → Profile form
- /resume → Resume upload
- /jobs → Static jobs list
- /interview → Simple Q&A
