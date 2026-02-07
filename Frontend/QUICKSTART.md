# Quick Start Guide

Get the LLM Security Helper running in 5 minutes!

## Frontend Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to `http://localhost:5173`

## Backend Setup (Optional)

The frontend will work without a backend, but you'll need one for actual LLM analysis.

### Option 1: Using the Example Backend (Python/FastAPI)

1. **Install Python dependencies**:
```bash
pip install fastapi uvicorn openai python-dotenv
```

2. **Create a `.env` file** in the project root:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

3. **Run the backend**:
```bash
python backend-example.py
```

The backend will start at `http://localhost:8000`

### Option 2: Using Groq (Faster & Free)

Replace the OpenAI code in `backend-example.py` with Groq:

```python
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

response = client.chat.completions.create(
    model="mixtral-8x7b-32768",
    messages=[
        {"role": "system", "content": "You are a security expert."},
        {"role": "user", "content": prompt}
    ]
)

analysis_result = response.choices[0].message.content
```

### Option 3: Mock Backend for Testing

The example backend includes a fallback that generates sample responses if no LLM API is configured. Just run:

```bash
python backend-example.py
```

Without setting up an API key, you'll get formatted sample responses.

## Testing the Application

### Test Code Analysis

1. Click "Code Analysis" button
2. Paste this vulnerable code:

```python
user_id = request.GET['id']
query = "SELECT * FROM users WHERE id = " + user_id
cursor.execute(query)
```

3. Press Enter or click Send
4. See the security analysis with fixes

### Test Specs Analysis

1. Click "Specs Review" button
2. Paste this specification:

```
Our app will accept user prompts and pass them directly to GPT-4.
Users can upload files which will be processed and stored in S3.
The app will have an admin panel accessible via /admin with basic auth.
```

3. Press Enter or click Send
4. See OWASP/ATLAS vulnerability analysis

## Deployment

### Deploy Frontend to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your app will be live in minutes!

### Deploy Backend to Railway/Render

1. Push your code to GitHub
2. Connect your repository to Railway or Render
3. Set environment variables (OPENAI_API_KEY, etc.)
4. Deploy!

Update your frontend `.env`:
```
VITE_API_BASE_URL=https://your-backend-url.com
```

## Troubleshooting

### CORS Errors
Make sure your backend has CORS enabled (already configured in example backend).

### API Not Responding
1. Check backend is running on port 8000
2. Verify `VITE_API_BASE_URL` in `.env`
3. Check browser console for errors

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Next Steps

- Customize the prompts in `backend-example.py`
- Add more security checks
- Implement user authentication (if needed)
- Add conversation history persistence
- Integrate with other LLM providers

## Need Help?

Check the main README.md for detailed documentation or open an issue on GitHub.

Happy security testing!
