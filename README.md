# Code Vulnerabilities Checker - LLM Security Helper

An AI-powered security analysis chatbot that helps developers identify security vulnerabilities in code and GenAI/LLM applications. The application provides comprehensive security analysis by mapping findings to industry-standard security frameworks including OWASP Top 10, OWASP Top 10 for LLM Applications, and MITRE ATLAS.

## Features

- **Code Security Analysis**: Paste vulnerable code snippets and receive detailed security vulnerability reports with recommended fixes
- **Application Specification Analysis**: Describe your GenAI/LLM application architecture and get potential security risks mapped to security frameworks
- **File Upload Support**: Upload code files (.txt, .md, .pdf, .docx) for analysis
- **Multi-Framework Mapping**: Vulnerabilities mapped to OWASP Top 10, OWASP LLM Top 10, and MITRE ATLAS
- **Real-time Chat Interface**: Clean, modern chat-style UI with typing indicators and smooth animations
- **Markdown Rendering**: Rich formatting for security analysis reports

## Tech Stack

### Frontend
- **React 18** + **TypeScript** - Modern UI framework with type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **React Markdown** + **remark-gfm** - GitHub-flavored markdown rendering
- **Axios** - HTTP client for API requests
- **Lucide React** - Icon library
- **React Context** - State management

### Backend
- **FastAPI** - Modern Python web framework
- **Groq** - LLM API integration
- **Python-dotenv** - Environment variable management
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## Project Structure

```
Code-Vulnerabilities-Checker/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInput.tsx       # Input field with send button
│   │   │   ├── ChatMessage.tsx     # Message bubble with markdown rendering
│   │   │   └── TypingIndicator.tsx # Animated typing indicator
│   │   ├── context/
│   │   │   └── ChatContext.tsx     # Chat state management
│   │   ├── services/
│   │   │   └── api.ts              # Axios API client
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript type definitions
│   │   ├── utils/
│   │   │   └── detectInputType.ts  # Input type detection
│   │   ├── App.tsx                 # Main application component
│   │   ├── index.css               # Global styles
│   │   └── main.tsx                # Application entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── settings.py         # Application configuration
│   │   │   └── system_prompt.py    # LLM system prompts
│   │   ├── routes/
│   │   │   └── chat.py             # Chat API endpoints
│   │   ├── services/
│   │   │   └── chat_service.py     # LLM interaction logic
│   │   └── main.py                 # FastAPI application
│   ├── LocalTesting/
│   │   └── test_groq.py            # Groq API testing script
│   └── requirements.txt            # Python dependencies
│
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+
- **Groq API Key** ([Get one here](https://console.groq.com/))

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the Backend directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

5. Start the FastAPI server:
```bash
# From Backend directory
python -m src.main
# Or
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Frontend directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Production Build

**Frontend:**
```bash
cd Frontend
npm run build
npm run preview  # Preview the production build
```

**Backend:**
```bash
cd Backend
uvicorn src.main:app --host 0.0.0.0 --port 8000
```

## API Documentation

### POST `/chat`

Analyzes code or application specifications for security vulnerabilities.

**Request (multipart/form-data):**
- `user_message` (string, required): The code snippet or application description
- `file` (file, optional): Upload a file (.txt, .md, .pdf, .docx)

**Response (JSON):**
```json
{
  "response": "Detailed security analysis with vulnerability mapping..."
}
```

**Analysis Modes:**

1. **Mode A - Code Analysis**: Triggered when input contains source code
   - Identifies specific vulnerabilities
   - Maps to OWASP Top 10, OWASP LLM Top 10, MITRE ATLAS
   - Provides concrete fixes and residual risk analysis

2. **Mode B - Specification Analysis**: Triggered when input describes an application
   - Identifies potential security risks
   - Provides attack scenarios
   - Maps to security frameworks
   - Suggests concrete mitigations

## Security Frameworks Covered

- **OWASP Top 10 (2025)** - Web application security risks
- **OWASP Top 10 for LLM Applications** - LLM-specific vulnerabilities
- **MITRE ATLAS** - Adversarial ML attack patterns

## Usage Example

1. Open the application in your browser
2. Type or paste code/specifications in the chat input
3. Optionally upload a file containing your code or specifications
4. Click send or press Enter
5. Receive comprehensive security analysis with actionable recommendations

## Development

**Frontend:**
```bash
cd Frontend
npm run dev          # Start dev server
```

**Backend:**
```bash
cd Backend
uvicorn src.main:app --reload   # Run the application
```

