import { createContext, useContext, useState, ReactNode } from "react";
import { Message } from "../types";
import { analyzeInput } from "../services/api";

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string, file?: File) => Promise<void>;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within ChatProvider");
  }
  return context;
};

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: `# Welcome to Secur-ingo!

Security analysis for your code and applications.

**1. Analyze Code for Vulnerabilities**
- Paste your code snippet to identify security issues like SQL injection, XSS, and more
- Get specific fixes and recommendations

**2. Review App Specifications**
- Share your app specs
- Receive vulnerability analysis mapped to OWASP Top 10 and ATLAS framework

Type your code or specifications below to get started.`,
  timestamp: new Date(),
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string, file?: File) => {
    setError(null);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await analyzeInput(content, file);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.analysis,
        timestamp: new Date(),
        inputTokens: response.input_tokens,
        outputTokens: response.output_tokens,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);

      const errorResponse: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: `**Error**: ${errorMessage}\n\nPlease make sure the backend server is running and try again.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
  };

  return (
    <ChatContext.Provider
      value={{ messages, isLoading, error, sendMessage, clearMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};
