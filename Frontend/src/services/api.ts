import axios from "axios";
import { AnalyzeResponse } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

export const analyzeInput = async (
  userMessage: string,
  file?: File,
): Promise<AnalyzeResponse> => {
  try {
    const formData = new FormData();
    formData.append("user_message", userMessage);
    if (file) {
      formData.append("file", file);
    }

    const response = await apiClient.post<AnalyzeResponse>("/chat", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("API Response:", {
      response_id: response.data.response_id,
      message_id: response.data.message_id,
      output_model: response.data.output_model,
      input_tokens: response.data.input_tokens,
      output_tokens: response.data.output_tokens,
    });
    return {
      ...response.data,
      analysis: response.data.output_model,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to process request. Please try again.",
      );
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    await apiClient.get("/health");
    return true;
  } catch {
    return false;
  }
};
