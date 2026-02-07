import { useState, FormEvent, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useChatContext } from "../context/ChatContext";

export const ChatInput = () => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { sendMessage, isLoading } = useChatContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input, selectedFile || undefined);
    setInput("");
    setSelectedFile(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t border-gray-800 bg-gray-900 sticky bottom-0">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-4 sm:px-6 md:px-8">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            rows={3}
            disabled={isLoading}
            className="flex-1 px-5 py-4 rounded-lg border border-gray-700 bg-gray-800 text-gray-50 placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all disabled:opacity-50 font-medium"
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: input.trim() && !isLoading ? 1.05 : 1 }}
            whileTap={{ scale: input.trim() && !isLoading ? 0.95 : 1 }}
            className={`px-4 py-4 rounded-lg transition-all self-end ${
              input.trim() && !isLoading
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-6 h-6" />
          </motion.button>
        </div>
      </form>
    </div>
  );
};
