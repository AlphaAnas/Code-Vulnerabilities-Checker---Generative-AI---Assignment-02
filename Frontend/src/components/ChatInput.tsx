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
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-4 sm:px-6 md:px-8">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            rows={1}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 resize-none transition-all disabled:opacity-50"
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: input.trim() && !isLoading ? 1.05 : 1 }}
            whileTap={{ scale: input.trim() && !isLoading ? 0.95 : 1 }}
            className={`p-3 rounded-lg transition-all ${
              input.trim() && !isLoading
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
                : "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
};
