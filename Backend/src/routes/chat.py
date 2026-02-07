import shutil
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from src.services.chat_service import call_model
from typing import Optional
import tempfile
import os


router = APIRouter()


@router.post("/chat")
async def chat(
    user_message: str = Form(...),
):
    """
    Endpoint for chatting with the bot.

    Args:
        user_message: The user's input message (required)
    

    Returns:
        The chatbot's response (most likely dict or str — depends on call_model)
    """


    try:
          
        response = call_model(user_message)   

        print("DEBUG RESPONSE:", response) 

        return response

    except Exception as e:
   
        print(f"Error in /chat: {e}")
        raise HTTPException(status_code=500, detail="Internal error while processing request")

   