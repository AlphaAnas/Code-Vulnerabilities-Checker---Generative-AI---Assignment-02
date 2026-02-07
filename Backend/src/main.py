from fastapi import FastAPI
import uvicorn
from src.routes.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# origins = [
#     "http://localhost:5173",       # your Vite dev server
#     "http://127.0.0.1:5173",       # sometimes browsers report this
#     "http://localhost",            # if you ever open index.html directly
# 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,        # important if you ever use cookies / auth
    allow_methods=["*"],           # allow GET, POST, PUT, DELETE, OPTIONS, etc.
    allow_headers=["*"],           # allow any headers (Content-Type, Authorization, etc.)
)


app.include_router(chat_router)


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "LLM Secur-ingo App",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs"
        }
    }


if __name__ == "__main__":

    uvicorn.run(app, host="0.0.0.0", port=8000)

