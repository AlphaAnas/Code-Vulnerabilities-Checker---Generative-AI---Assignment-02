import os
# from groq import (
#     AuthenticationError,
#     APIConnectionError,
#     BadRequestError,
#     InternalServerError,
#     NotFoundError,
#     RateLimitError,
# )
from src.config.system_prompt import SYSTEM_PROMPT
from src.config.settings import MODEL_ID
import openai

import time
import logging
import base64

from dotenv import load_dotenv


load_dotenv()


GROQ_API_KEY = os.getenv("GROQ_API_KEY")


# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = openai.OpenAI(api_key=GROQ_API_KEY,
                       base_url="https://api.groq.com/openai/v1"
                       )


def call_model(
    user_prompt, retry_attempts=3, base_delay=2
):
    """Process an image using Groq's vision API with retry logic."""

    for attempt in range(retry_attempts):
        try:
            response = client.responses.create(
                model = MODEL_ID,
                input=
                
                [

                    {
                        "role": "system",
                        "content" : SYSTEM_PROMPT

                    },
                    {
                        "role": "user",
                        "content": user_prompt             
                        
                    },
                ],
            )

   

            response_id = response.id
            message_id = [message.id for message in response.output if message.type == "message"][0]
            output_model = response.output_text
            input_tokens = response.usage.input_tokens
            output_tokens = response.usage.output_tokens

            return {
                    "response_id" : response_id,
                    "message_id" : message_id,
                    "output_model" : output_model,
                    "input_tokens" : input_tokens,
                    "output_tokens" : output_tokens


            }

            # response = chat_completion.choices[0].message.content

            #  c

            # if response:
            #     logger.info(
            #         f"Successfully processed {filename} - Response length: {len(response)} characters"
            #     )
            #     return response
            # else:
            #     logger.warning(f"Empty response received for {filename}")
            #     if attempt == retry_attempts - 1:
            #         return "Error: Empty response received"

        # except RateLimitError as e:
        #     # Rate limit hit (Error 429)
        #     # Check if a Retry-After header is present
        #     retry_after_delay = getattr(e, "retry_after", None)
        #     if retry_after_delay is not None:
        #         wait_time = int(retry_after_delay)
        #         logger.warning(
        #             f"Rate limit exceeded for {filename}. Attempt {attempt + 1}/{retry_attempts}. Retrying in {wait_time}s... Error: {str(e)}"
        #         )
        #     else:
        #         wait_time = base_delay * (attempt + 1)
        #         logger.warning(
        #             f"Rate limit exceeded without Retry-After header for {filename}. Using default backoff: {wait_time}s"
        #         )

        #     if attempt < retry_attempts - 1:  # Don't sleep on last attempt
        #         time.sleep(wait_time)
        #         continue
        #     else:
        #         error_msg = f"Rate limit exhausted after {retry_attempts} attempts for {filename}"
        #         logger.error(error_msg)
        #         return f"Error: {error_msg}"

        # except BadRequestError as arg_error:
        #     # Invalid request parameters
        #     error_msg = f"Invalid argument for {filename}: {str(arg_error)}"
        #     logger.error(error_msg)
        #     return f"Error: {error_msg}"

        # except AuthenticationError as auth_error:
        #     # Authentication or permission issues
        #     error_msg = f"Permission denied for {filename}: {str(auth_error)}"
        #     logger.error(error_msg)
        #     return f"Error: {error_msg}"

        # except NotFoundError as not_found_error:
        #     # Model or resource not found
        #     error_msg = f"Resource not found for {filename}: {str(not_found_error)}"
        #     logger.error(error_msg)
        #     return f"Error: {error_msg}"

        # except InternalServerError as server_error:
        #     # Server errors (500)
        #     logger.warning(
        #         f"Internal server error for {filename} (Attempt {attempt + 1}/{retry_attempts}): {str(server_error)}"
        #     )
        #     if attempt < retry_attempts - 1:
        #         wait_time = base_delay * (
        #             attempt + 1
        #         )  # Linear backoff for server errors
        #         logger.info(f"Retrying in {wait_time}s due to server error...")
        #         time.sleep(wait_time)
        #         continue
        #     else:
        #         error_msg = f"Server error persisted after {retry_attempts} attempts for {filename}"
        #         logger.error(error_msg)
        #         return f"Error: {error_msg}"

        # except APIConnectionError as service_error:
        #     # Service unavailable (503)
        #     logger.warning(
        #         f"Service unavailable for {filename} (Attempt {attempt + 1}/{retry_attempts}): {str(service_error)}"
        #     )
        #     if attempt < retry_attempts - 1:
        #         wait_time = base_delay * (attempt + 1)
        #         logger.info(
        #             f"Retrying in {wait_time}s due to service unavailability..."
        #         )
        #         time.sleep(wait_time)
        #         continue
        #     else:
        #         error_msg = f"Service unavailable after {retry_attempts} attempts for {filename}"
        #         logger.error(error_msg)
        #         return f"Error: {error_msg}"

        except Exception as e:
            # Catch-all for unexpected errors
            # error_type = type(e).__name__
            # error_msg = f"Unexpected {error_type} for {filename} (Attempt {attempt + 1}/{retry_attempts}): {str(e)}"
            # logger.error(error_msg)

            # # For unknown errors, try once more if not last attempt
            # if attempt < retry_attempts - 1:
            #     logger.info(f"Retrying due to unexpected error...")
            #     time.sleep(base_delay)
            #     continue
            # else:
                return f"Error: {e}"