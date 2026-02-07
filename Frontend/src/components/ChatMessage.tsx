import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "../types";
import { formatTimestamp } from "../utils/detectInputType";
import { Shield, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  index: number;
}

export const ChatMessage = ({ message, index }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex items-start space-x-3 mb-6 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: index * 0.05 + 0.1,
          type: "spring",
          stiffness: 500,
        }}
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg ${
          isUser
            ? "bg-gradient-to-br from-cyan-500 to-teal-600 shadow-cyan-500/50"
            : "bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/50"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Shield className="w-4 h-4 text-white" />
        )}
      </motion.div>

      <div
        className={`flex-1 max-w-3xl ${isUser ? "flex flex-col items-end" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 + 0.2 }}
          className={`rounded-lg px-4 py-3 shadow-lg ${
            isUser
              ? "bg-gradient-to-br from-cyan-600/30 to-teal-700/30 text-cyan-100 border border-cyan-500/30"
              : "bg-gray-900/50 border border-cyan-500/30 backdrop-blur-sm"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-headings:mt-3 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-cyan-300 mb-1">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-300 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-5 text-gray-300">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-5 text-gray-300">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="my-1">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-cyan-400">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-cyan-300">{children}</em>
                  ),
                  code: ({ className, children }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono border border-cyan-500/30">
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-black/50 text-green-400 p-4 rounded-lg border border-cyan-500/30 overflow-x-auto text-sm font-mono my-2">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-black/50 border border-cyan-500/30 rounded-lg overflow-hidden my-2">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-cyan-300/70">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </motion.div>

        <div
          className={`flex flex-col gap-0.5 mt-1 px-2 ${isUser ? "items-end" : "items-start"}`}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 + 0.3 }}
            className="text-xs text-cyan-500/50"
          >
            {formatTimestamp(message.timestamp)}
          </motion.span>
          {!isUser &&
            (message.inputTokens !== undefined ||
              message.outputTokens !== undefined) && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.35 }}
                className="text-xs text-cyan-500/40"
              >
                Tokens: {message.inputTokens || 0} in /{" "}
                {message.outputTokens || 0} out
              </motion.span>
            )}
        </div>
      </div>
    </motion.div>
  );
};
