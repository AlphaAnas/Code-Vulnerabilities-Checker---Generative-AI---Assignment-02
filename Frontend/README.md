# LLM Security Helper

An AI-powered chatbot interface for analyzing code vulnerabilities and reviewing GenAI/Agentic application specifications. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Code Vulnerability Analysis**: Submit code snippets to identify security issues like SQL injection, XSS, and more
- **Specification Review**: Analyze GenAI/Agentic app specifications for potential vulnerabilities mapped to OWASP Top 10 for LLMs and ATLAS framework
- **Beautiful Chat Interface**: Modern, animated chatbot-style UI with smooth transitions
- **Auto-Detection**: Automatically detects whether input is code or specifications
- **Markdown Support**: Rich formatting for analysis results with syntax highlighting
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **No Authentication Required**: Fully open and anonymous usage

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Markdown** with GitHub Flavored Markdown support
- **Axios** for API calls
- **Lucide React** for icons
- **Vite** for blazing-fast development

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd llm-security-helper
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:
```
VITE_API_BASE_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Backend API Integration

This frontend expects a backend API with the following endpoint:

### POST `/analyze`

**Request Body:**
```json
{
  "type": "code" | "specs" | "general",
  "input": "string"
}
```

**Response:**
```json
{
  "analysis": "markdown-formatted analysis result",
  "type": "code" | "specs" | "general"
}
```

### Example Backend Implementation (Python/FastAPI)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    type: str
    input: str

class AnalyzeResponse(BaseModel):
    analysis: str
    type: str

@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    if request.type == "code":
        prompt = f"Analyze this code for security vulnerabilities:\n\n{request.input}"
    elif request.type == "specs":
        prompt = f"Analyze these app specifications for potential vulnerabilities (OWASP Top 10 for LLMs, ATLAS):\n\n{request.input}"
    else:
        prompt = request.input

    # Call your LLM API here (OpenAI, Groq, etc.)
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    return AnalyzeResponse(
        analysis=response.choices[0].message.content,
        type=request.type
    )

@app.get("/health")
async def health():
    return {"status": "ok"}
```

## Project Structure

```
src/
├── components/
│   ├── ChatInput.tsx       # Input field with mode selection
│   ├── ChatMessage.tsx     # Individual message component with markdown
│   └── TypingIndicator.tsx # Loading animation
├── context/
│   └── ChatContext.tsx     # State management for chat
├── services/
│   └── api.ts             # API client and error handling
├── types/
│   └── index.ts           # TypeScript type definitions
├── utils/
│   └── detectInputType.ts # Auto-detection logic for input type
├── App.tsx                # Main application component
├── index.css              # Global styles and Tailwind imports
└── main.tsx              # Application entry point
```

## Usage

1. **Launch the app** - You'll see a welcome message explaining the capabilities
2. **Enter your input** - Type or paste code/specifications in the input field
3. **Select mode (optional)** - Click "Code Analysis" or "Specs Review" buttons to explicitly set the analysis type
4. **Send** - Press Enter or click the send button
5. **View results** - The AI will analyze your input and display formatted results in the chat

## Key Features

### Automatic Input Detection

The app automatically detects whether you're submitting:
- **Code**: Looks for programming syntax, function declarations, SQL queries, etc.
- **Specifications**: Identifies descriptive text about applications, features, and requirements
- **General**: Fallback for unclear inputs

### Rich Markdown Formatting

Analysis results support:
- **Headers** for section organization
- **Bold** and *italic* text
- `Inline code` and code blocks with syntax highlighting
- Lists (bulleted and numbered)
- Blockquotes
- Links

### Smooth Animations

- Fade-in effects for new messages
- Typing indicator with bouncing dots
- Hover effects on buttons
- Smooth scrolling to latest messages
- Scale animations on user interactions

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### GitHub Pages

1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
})
```

2. Build and deploy:
```bash
npm run build
npx gh-pages -d dist
```

### Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues, questions, or contributions, please open an issue on GitHub.
