import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import LoadingDots from '@/app/dashboard/_components/TemplateListSection'
import { cn } from '@/lib/utils';

interface StreamingTextProps {
  text: string;
  speed?: number;
  isComplete?: boolean;
  onComplete?: () => void;
  darkMode?: boolean;
}

const StreamingText = ({ 
  text, 
  speed = 5, 
  isComplete = false,
  onComplete,
  darkMode = false
}: StreamingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  
  useEffect(() => {
    // Reset when text changes completely
    if (!displayedText.startsWith(text.slice(0, 10)) && !text.startsWith(displayedText.slice(0, 10))) {
      setDisplayedText('');
      setIsStreaming(true);
    }
    
    if (isComplete) {
      setDisplayedText(text);
      setIsStreaming(false);
      if (onComplete) onComplete();
      return;
    }
    
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        // Add random variance to typing speed to make it look more natural
        const chunkSize = Math.max(1, Math.floor(speed + (Math.random() * speed - speed/2)));
        setDisplayedText(text.slice(0, Math.min(displayedText.length + chunkSize, text.length)));
      }, 10); // 10ms between updates
      
      return () => clearTimeout(timeout);
    } else {
      setIsStreaming(false);
      if (onComplete) onComplete();
    }
  }, [text, displayedText, speed, isComplete, onComplete]);
  
  // Custom renderers for markdown
  const customComponents = {
    h1: ({node, ...props}: any) => (
      <h1 
        className={cn(
          "text-xl md:text-2xl font-bold mt-6 mb-4 pb-1 border-b",
          darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-900"
        )} 
        {...props} 
      />
    ),
    h2: ({node, ...props}: any) => (
      <h2 
        className={cn(
          "text-lg md:text-xl font-bold mt-6 mb-3",
          darkMode ? "text-white" : "text-gray-900"
        )} 
        {...props} 
      />
    ),
    h3: ({node, ...props}: any) => (
      <h3 
        className={cn(
          "text-md md:text-lg font-bold mt-4 mb-2",
          darkMode ? "text-white" : "text-gray-900"
        )} 
        {...props} 
      />
    ),
    a: ({node, ...props}: any) => (
      <a 
        className={cn(
          "underline font-medium",
          darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
        )} 
        target="_blank"
        rel="noopener noreferrer"
        {...props} 
      />
    ),
    strong: ({node, ...props}: any) => (
      <strong 
        className={cn(
          "font-bold",
          darkMode ? "text-white" : "text-gray-900"
        )} 
        {...props} 
      />
    ),
    em: ({node, ...props}: any) => (
      <em 
        className="italic" 
        {...props} 
      />
    ),
    ul: ({node, ...props}: any) => (
      <ul 
        className="list-disc pl-8 my-4 space-y-1" 
        {...props} 
      />
    ),
    ol: ({node, ...props}: any) => (
      <ol 
        className="list-decimal pl-8 my-4 space-y-1" 
        {...props} 
      />
    ),
    li: ({node, ...props}: any) => (
      <li 
        className="pl-1" 
        {...props} 
      />
    ),
    blockquote: ({node, ...props}: any) => (
      <blockquote 
        className={cn(
          "border-l-4 pl-4 py-2 my-4 italic",
          darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"
        )} 
        {...props} 
      />
    ),
    code: ({node, className, children, ...props}: any) => {
      const match = /language-(\w+)/.exec(className || '');
      // Check if it's an inline code or a code block
      const isInline = !match && !props.node?.position?.start.line;
      
      return !isInline && match ? (
        <div className="relative my-4 rounded-md overflow-hidden">
          {/* Optional language tag */}
          <div className={cn(
            "absolute right-2 top-2 text-xs px-2 py-0.5 rounded opacity-80",
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
          )}>
            {match[1]}
          </div>
          <SyntaxHighlighter
            style={darkMode ? vscDarkPlus : oneLight}
            language={match[1]}
            PreTag="div"
            className={cn(
              "rounded-md !my-0 !bg-opacity-75",
              darkMode ? "!bg-gray-800" : "!bg-gray-50"
            )}
            customStyle={{
              margin: 0,
              padding: "1.5rem 1rem",
              fontSize: "0.9rem",
              lineHeight: 1.5,
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code 
          className={cn(
            "px-1.5 py-0.5 rounded text-sm",
            darkMode ? "bg-gray-800 text-pink-400" : "bg-gray-100 text-pink-600"
          )} 
          {...props}
        >
          {children}
        </code>
      );
    },
    table: ({node, ...props}: any) => (
      <div className="overflow-x-auto my-6">
        <table 
          className={cn(
            "min-w-full border-collapse",
            darkMode ? "text-gray-300" : "text-gray-700"
          )} 
          {...props} 
        />
      </div>
    ),
    thead: ({node, ...props}: any) => (
      <thead 
        className={cn(
          "border-b",
          darkMode ? "border-gray-700" : "border-gray-300"
        )} 
        {...props} 
      />
    ),
    tbody: ({node, ...props}: any) => (
      <tbody {...props} />
    ),
    tr: ({node, ...props}: any) => (
      <tr 
        className={cn(
          "border-b",
          darkMode ? "border-gray-800" : "border-gray-200"
        )} 
        {...props} 
      />
    ),
    th: ({node, ...props}: any) => (
      <th 
        className={cn(
          "px-4 py-3 text-left font-semibold",
          darkMode ? "text-gray-200" : "text-gray-800"
        )} 
        {...props} 
      />
    ),
    td: ({node, ...props}: any) => (
      <td 
        className="px-4 py-2" 
        {...props} 
      />
    ),
    hr: ({node, ...props}: any) => (
      <hr 
        className={cn(
          "my-6", 
          darkMode ? "border-gray-700" : "border-gray-300"
        )} 
        {...props} 
      />
    ),
    p: ({node, ...props}: any) => (
      <p 
        className="my-3" 
        {...props} 
      />
    ),
    img: ({node, ...props}: any) => (
      <img 
        className="max-w-full h-auto my-4 rounded-md" 
        {...props} 
      />
    ),
  };

  return (
    <div className={cn(
      "prose max-w-none",
      darkMode 
        ? "prose-invert prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-white" 
        : "prose-gray prose-headings:text-gray-800 prose-p:text-gray-700"
    )}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={customComponents}
      >
        {displayedText}
      </ReactMarkdown>
      
      {isStreaming && (
        <span className="inline-flex items-center">
          <span className={cn(
            "inline-block w-2 h-4 ml-0.5", 
            darkMode ? "bg-green-500" : "bg-indigo-600",
            "animate-[blink_1s_step-start_infinite]"
          )}></span>
        </span>
      )}
    </div>
  );
};

export default StreamingText;