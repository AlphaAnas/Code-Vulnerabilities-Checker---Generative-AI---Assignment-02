# Code Vulnerabilities Checker - LLM Security Helper

An AI-powered security analysis chatbot that helps developers identify security vulnerabilities in code and GenAI/LLM applications. The application provides comprehensive security analysis by mapping findings to industry-standard security frameworks including OWASP Top 10, OWASP Top 10 for LLM Applications, and MITRE ATLAS.

```markdown
# LLM Security Helper

A clean, chat-style web app that helps developers spot security issues in two ways:

- Paste vulnerable code → get specific vulnerabilities and recommended fixes
- Describe a GenAI/LLM app or agent → get potential risks mapped to OWASP Top 10 for LLM Applications + ATLAS framework

Built as a frontend-only React app that talks to a separate FastAPI backend (which handles the actual LLM calls).

## Tech Stack

- React 18 + TypeScript
- Vite (build tool & dev server)
- Tailwind CSS
- Framer Motion (smooth chat animations & typing indicator)
- React Markdown (with GitHub-flavored markdown support)
- Axios (for API requests)
- Lucide React (icons)
- React Context (simple chat state management)

## Project Structure

```
llm-security-helper/
├── public/                     # static assets
├── src/
│   ├── components/
│   │   ├── ChatInput.tsx       # input + send button + mode buttons
│   │   ├── ChatMessage.tsx     # single message bubble with markdown rendering
│   │   └── TypingIndicator.tsx # animated dots while waiting for response
│   ├── context/
│   │   └── ChatContext.tsx     # chat history & state
│   ├── services/
│   │   └── api.ts              # axios instance + analyze function
│   ├── types/
│   │   └── index.ts            # shared TypeScript types
│   ├── utils/
│   │   └── detectInputType.ts  # heuristic to guess "code" vs "specs"
│   ├── App.tsx                 # main layout + chat container
│   ├── index.css               # Tailwind + global styles
│   └── main.tsx                # entry point
├── .env.example
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm (or yarn / pnpm)

### Installation

1. Clone the repo

```bash
git clone <your-repo-url>
cd llm-security-helper
```

2. Install dependencies

```bash
npm install
```

3. Set up the environment variable

```bash
cp .env.example .env
```

Open `.env` and point it to your backend:

```
VITE_API_BASE_URL=http://localhost:8000
# or wherever your FastAPI server is running
```

4. Start the development server

```bash
npm run dev
```

→ Open http://localhost:5173 (or the port Vite shows)

### Production Build

```bash
npm run build
```

→ Output goes to `dist/`

Preview locally:

```bash
npm run preview
```

## Backend Requirement

This frontend expects a FastAPI (or compatible) backend with **one main endpoint**:

**POST** `/analyze`

**Request body** (JSON):

```json
{
  "type": "code" | "specs" | "general",
  "input": "the code snippet or the app description here"
}
```

**Expected response** (JSON):

```json
{
  "analysis": "markdown formatted string with vulnerabilities, explanations, fixes, etc.",
  "type": "code" | "specs" | "general"
}
```

### Minimal backend example (FastAPI)

```python
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    type: str
    input: str

@app.post("/chat")
async def chat(req: AnalyzeRequest):
   
    return {
        "analysis": f"## Analysis for {req.type}\n\nYou sent:\n```\n{req.input}\n```\n\n(LLM result would go here)",
        "type": req.type
    }
```

Run with:

```bash
uvicorn main:app --reload 
```
