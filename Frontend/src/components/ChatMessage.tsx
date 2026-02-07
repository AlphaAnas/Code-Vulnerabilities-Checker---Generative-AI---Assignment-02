import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "../types";
import { formatTimestamp } from "../utils/detectInputType";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  index: number;
}

export const ChatMessage = ({ message, index }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`w-full ${isUser ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}`}
    >
      <div className="max-w-2xl mx-auto px-4 py-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex gap-4 md:gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0 flex items-start pt-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                isUser
                  ? "bg-gray-800 dark:bg-white dark:text-gray-900"
                  : "bg-gray-700 dark:bg-gray-600"
              }`}
            >
              {isUser ? (
                <User className="w-5 h-5" />
              ) : (
                <Bot className="w-5 h-5" />
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            {isUser ? (
              <p className="text-base text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                {message.content}
              </p>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold mt-5 mb-2 text-gray-900 dark:text-gray-100">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="my-3 text-base text-gray-700 dark:text-gray-300 leading-7">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="my-3 ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="my-3 ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-base leading-7">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900 dark:text-gray-100">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gray-700 dark:text-gray-300">
                        {children}
                      </em>
                    ),
                    code: ({ className, children }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                          {children}
                        </code>
                      ) : (
                        <code className="block bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border border-gray-300 dark:border-gray-700 overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 my-3">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden my-3">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 my-3">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {children}
                      </a>
                    ),
                    table: ({ children }) => (
                      <table className="border-collapse border border-gray-300 dark:border-gray-700 w-full my-3">
                        {children}
                      </table>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-300 dark:border-gray-700 p-2 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100 text-left">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-300 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-300">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}

            {/* Timestamp & Tokens */}
            {!isUser && (
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700/50 text-xs text-gray-500 dark:text-gray-500">
                <span>{formatTimestamp(message.timestamp)}</span>
                {(message.inputTokens !== undefined ||
                  message.outputTokens !== undefined) && (
                  <span>
                    {message.inputTokens || 0} → {message.outputTokens || 0}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
