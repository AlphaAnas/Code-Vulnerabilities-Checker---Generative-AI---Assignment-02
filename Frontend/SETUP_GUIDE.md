# Setup & Run Guide

## Prerequisites

- Node.js v18 or higher
- npm or yarn

## Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React & React DOM
- Vite (fast build tool)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Markdown
- Axios
- Lucide React (icons)

### 2. Start Development Server
```bash
npm run dev
```

This command:
- Starts a local development server
- Enables hot module replacement (HMR)
- Opens the app automatically at `http://localhost:5173`
- Watches for changes and reloads instantly

### 3. Open in Browser

The app will automatically open at: **http://localhost:5173**

## What You'll See

1. **Welcome Screen**: The AI chatbot welcomes you
2. **Input Area**: Type or paste code/specifications
3. **Mode Buttons**: Click "Code Analysis" or "Specs Review" to set the analysis type
4. **Chat Interface**: Messages appear with animations

## For Production Build

```bash
npm run build
```

Output files will be in the `dist/` folder, ready for deployment to:
- Vercel
- Netlify
- GitHub Pages
- Any static host

## Backend Setup (Optional)

To enable actual LLM analysis:

1. **Install Python dependencies**:
```bash
pip install -r requirements.txt
```

2. **Set up environment (in .env file)**:
```
OPENAI_API_KEY=your_key_here
# or use GROQ_API_KEY for free option
```

3. **Run backend**:
```bash
python backend-example.py
```

The backend will run on `http://localhost:8000`

## Project Files Explained

```
src/
├── components/          # React UI components
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   └── TypingIndicator.tsx
├── context/             # React Context for state
│   └── ChatContext.tsx
├── services/            # API integration
│   └── api.ts
├── types/               # TypeScript definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── detectInputType.ts
├── App.tsx              # Main component
├── main.tsx             # Entry point
└── index.css            # Global styles

Configuration Files:
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config
├── tailwind.config.js   # Tailwind CSS
├── postcss.config.js    # PostCSS plugins
├── package.json         # Dependencies
└── index.html           # HTML template

Documentation:
├── README.md            # Full documentation
├── QUICKSTART.md        # Quick setup guide
├── PROJECT_OVERVIEW.md  # Architecture details
└── SETUP_GUIDE.md       # This file
```

## Troubleshooting

### Port 5173 Already in Use
```bash
npm run dev -- --port 3000
```

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Backend Not Found
- Make sure `VITE_API_BASE_URL` in `.env` matches your backend URL
- Default is `http://localhost:8000`
- Backend must be running at that address

### Styling Not Applied
- Tailwind CSS requires a rebuild
- Kill the dev server and run `npm run dev` again
- Clear browser cache if needed

## Available Commands

```bash
# Development
npm run dev          # Start dev server

# Building
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run typecheck    # Run TypeScript checking
```

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Available variables:
- `VITE_API_BASE_URL` - Backend API base URL

Note: Only variables prefixed with `VITE_` are accessible in the browser.

## Next Steps

1. ✅ Run `npm install && npm run dev`
2. Try analyzing some code or specs
3. Set up backend if needed
4. Deploy to production
5. Customize prompts in backend for your use case

## Support

- Check README.md for detailed info
- Review PROJECT_OVERVIEW.md for architecture
- Examine component code for examples
- Check browser console (F12) for errors

---

You're all set! Just run: `npm install && npm run dev`
