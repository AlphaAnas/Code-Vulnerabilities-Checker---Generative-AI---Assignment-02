from fastapi import APIRouter, HTTPException, UploadFile, File
from services.chat_service import call_model
from typing import Optional



router = APIRouter()


@router.post("/chat")
async def chat(
    user_message,
    file : Optional[UploadFile] = File (None)
    ):

    '''
    Endpoint for chatting with the bot.

    Args:
        user_message (str): The user's input message.
        file (UploadFile, optional): A .txt or .docx file for requirements. Defaults to None.

    Returns:
        str: The chatbot's response message.
    '''

    response = "a sample chatbot response"

    return response