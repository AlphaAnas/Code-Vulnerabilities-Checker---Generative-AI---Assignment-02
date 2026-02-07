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
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-cyan-500/30 bg-black/40 backdrop-blur-md p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your code or specifications... (Shift+Enter for new line)"
              rows={3}
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-900/50 border border-cyan-500/30 text-cyan-100 placeholder-cyan-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 resize-none transition-all disabled:bg-gray-900/30 disabled:cursor-not-allowed"
            />
          </div>

          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: input.trim() && !isLoading ? 1.05 : 1 }}
            whileTap={{ scale: input.trim() && !isLoading ? 0.95 : 1 }}
            className={`p-3 rounded-lg transition-all ${
              input.trim() && !isLoading
                ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
                : "bg-gray-800 text-gray-600 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        <p className="text-xs text-cyan-500/60 mt-2 text-center">
          Secure vulnerability analysis • Press Enter to send
        </p>
      </form>
    </div>
  );
};
