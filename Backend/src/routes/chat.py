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
    file: Optional[UploadFile] = File(None),
):
    """
    Endpoint for chatting with the bot.

    Args:
        user_message: The user's input message (required)
        file: Optional .txt or .docx file containing e.g. requirements / code / specs

    Returns:
        The chatbot's response (most likely dict or str — depends on call_model)
    """

    file_path = None

    try:
        if file:
    
            allowed_extensions = {".txt", ".docx", ".pdf", ".md"} 
            filename_lower = file.filename.lower()
            if not any(filename_lower.endswith(ext) for ext in allowed_extensions):
                raise HTTPException(
                    status_code=400,
                    detail=f"Unsupported file type. Allowed: {', '.join(allowed_extensions)}"
                )

            suffix = os.path.splitext(file.filename)[1] or ".txt"
            with tempfile.NamedTemporaryFile(
                delete=False, suffix=suffix, prefix="chat_upload_"
            ) as temp_file:
                shutil.copyfileobj(file.file, temp_file)
                file_path = temp_file.name

         
            await file.close()

       
            response = call_model(user_message, file_path)

        else:
          
            response = call_model(user_message)   

        print("DEBUG RESPONSE:", response) 

        return response

    except Exception as e:
   
        print(f"Error in /chat: {e}")
        raise HTTPException(status_code=500, detail="Internal error while processing request")

    finally:
        # Clean up temporary file 
        if file_path and os.path.exists(file_path):
            try:
                os.unlink(file_path)
            except Exception as cleanup_err:
                print(f"Failed to delete temp file {file_path}: {cleanup_err}")