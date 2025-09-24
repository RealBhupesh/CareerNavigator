# Vercel Deployment Guide

## Project Overview
This is a hybrid Next.js + Flask application for career navigation with AI-powered features.

## Architecture
- **Frontend**: Next.js 15.2.4 with React 19
- **Backend**: Flask (Python 3.11) for simple API routes
- **AI Features**: OpenAI GPT-4o integration via Next.js API routes
- **Styling**: Tailwind CSS

## Pre-Deployment Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file with:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Local Development
```bash
# Start Next.js frontend
npm run dev

# In another terminal, start Flask backend
python backend/main.py
```

## Vercel Deployment

### 1. Connect to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect it's a Next.js project

### 2. Environment Variables in Vercel
In your Vercel dashboard, add these environment variables (Project Settings → Environment Variables):
- `OPENAI_API_KEY`: Your OpenAI API key

### 3. Build Settings
Vercel will automatically:
- Detect Next.js framework
- Install dependencies from `package.json`
- Build the project (`next build`)
- Install Python function dependencies from root `requirements.txt`
- Deploy the Python function from `api/index.py`

### 4. API Routes
- **Next.js API routes**: `/api/analyze-profile`, `/api/analyze-resume`, `/api/interview/*`
- **Flask API routes**: `/pyapi/*` (routed to the Python function via `vercel.json`)

## Project Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # Next.js API routes (AI features)
│   ├── careers/           # Career pages
│   ├── dashboard/         # Dashboard page
│   └── ...
├── api/                   # Vercel Python function entry point
│   └── index.py
├── backend/               # Flask application
│   ├── main.py           # Flask routes (converted to JSON)
│   └── requirements.txt  # Python dependencies
├── components/            # React components
├── vercel.json           # Vercel configuration
└── next.config.mjs       # Next.js configuration
```

## Features
- **Profile Analysis**: AI-powered career guidance
- **Resume Analysis**: Detailed resume feedback with ATS optimization
- **Job Matching**: Skill-based job recommendations
- **Interview Practice**: AI-powered mock interviews
- **Career Exploration**: Detailed career path information

## Troubleshooting

### Common Issues
1. **Build Failures**: Ensure all dependencies are in `package.json`
2. **API Errors**: Verify `OPENAI_API_KEY` is set in Vercel and not hardcoded
3. **Python Function Issues**: Ensure root `requirements.txt` contains Flask deps (Werkzeug, etc.)

### Local Testing
```bash
# Test Next.js API routes
curl http://localhost:3000/api/health

# Test Flask API routes
curl http://localhost:3000/pyapi/health
```

## Production URLs
- Frontend: `https://<your-project>.vercel.app`
- Flask API: `https://<your-project>.vercel.app/pyapi/*`
- Next.js API: `https://<your-project>.vercel.app/api/*`

## Security Notes
- Do not commit secrets. `vercel.json` must not contain keys; use Vercel env vars.
- The OpenAI key is read at runtime by the `ai` SDK; make sure it exists.

