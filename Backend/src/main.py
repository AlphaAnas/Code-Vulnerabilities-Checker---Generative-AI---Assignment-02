from fastapi import FastAPI
import uvicorn
from routes.chat import router as chat_router


app = FastAPI()

app.include_router(chat_router)

# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "LLM Security Helper App",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs"
        }
    }


if __name__ == "__main__":

    uvicorn.run(app, host="0.0.0.0", port=8000)

