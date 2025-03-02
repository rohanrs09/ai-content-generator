import React from 'react';
import { motion } from 'framer-motion';
import { User } from "lucide-react";
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  content: string | React.ReactNode;
  isAI: boolean;
  isLoading?: boolean;
  icon?: string;
  darkMode?: boolean;
}

const ChatMessage = ({ content, isAI, isLoading = false, icon, darkMode = false }: ChatMessageProps) => {
  return (
    <motion.div 
      className={cn(
        "p-4 md:p-6 flex gap-4",
        isAI 
          ? (darkMode ? "bg-gray-800/50 border-t border-gray-700" : "bg-white border-t") 
          : (darkMode ? "bg-gray-900" : "bg-gray-50")
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0 mt-1">
        <div className={cn(
          "h-8 w-8 rounded-md flex items-center justify-center",
          isAI 
            ? (darkMode ? "bg-indigo-500/20" : "bg-primary/10") 
            : (darkMode ? "bg-gray-800" : "bg-gray-200")
        )}>
          {isAI ? (
            icon ? (
              <img src={icon} alt="AI" className="h-5 w-5 object-contain" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4", darkMode ? "text-indigo-300" : "text-primary")}>
                <path d="M12 8V4H8"></path>
                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                <path d="M2 14h2"></path>
                <path d="M20 14h2"></path>
                <path d="M15 13v2"></path>
                <path d="M9 13v2"></path>
              </svg>
            )
          ) : (
            <User className={cn("h-4 w-4", darkMode ? "text-gray-400" : "text-gray-600")} />
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        {!isLoading ? (
          <div className={cn(
            "prose prose-sm md:prose-base max-w-none",
            darkMode 
              ? "prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-white prose-invert" 
              : "prose-headings:text-gray-800"
          )}>
            {typeof content === 'string' ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({node, className, children, ...props}: {node?: any, className?: string, children?: React.ReactNode}) {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match && !node?.position?.start.line;
                    
                    return !isInline && match ? (
                      <SyntaxHighlighter
                        style={darkMode ? (vscDarkPlus as any) : (oneLight as any)}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-md border overflow-hidden"
                        customStyle={{
                          margin: '1rem 0',
                          borderRadius: '0.375rem',
                          border: darkMode ? '1px solid #3f3f46' : '1px solid #e5e7eb'
                        }}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code 
                        className={cn(
                          className, 
                          "px-1 py-0.5 rounded text-sm",
                          darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
                        )} 
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  // Custom styling for other markdown elements
                  h1: ({node, ...props}) => <h1 className={cn("text-2xl font-bold border-b pb-2 mb-4", darkMode ? "border-gray-700" : "border-gray-200")} {...props} />,
                  h2: ({node, ...props}) => <h2 className={cn("text-xl font-bold mt-6 mb-4", darkMode ? "text-gray-100" : "")} {...props} />,
                  h3: ({node, ...props}) => <h3 className={cn("text-lg font-bold mt-5 mb-3", darkMode ? "text-gray-100" : "")} {...props} />,
                  a: ({node, ...props}) => <a className={cn("text-blue-500 hover:underline")} {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4" {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote 
                      className={cn(
                        "border-l-4 pl-4 italic my-4", 
                        darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"
                      )} 
                      {...props} 
                    />
                  ),
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-6">
                      <table className={cn(
                        "min-w-full divide-y text-sm",
                        darkMode ? "divide-gray-700" : "divide-gray-300"
                      )} {...props} />
                    </div>
                  ),
                  th: ({node, ...props}) => (
                    <th 
                      className={cn(
                        "px-4 py-3 text-left font-medium",
                        darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100"
                      )} 
                      {...props} 
                    />
                  ),
                  td: ({node, ...props}) => (
                    <td 
                      className={cn(
                        "px-4 py-3 border-t",
                        darkMode ? "border-gray-700" : "border-gray-200"
                      )} 
                      {...props} 
                    />
                  )
                }}
              >
                {content}
              </ReactMarkdown>
            ) : (
              content
            )}
          </div>
        ) : (
          <div className="flex items-center h-6 text-primary">
            Thinking...
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;