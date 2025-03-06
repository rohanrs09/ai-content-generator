"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Copy, Check, Download, Sparkles, Code, Clipboard, RefreshCw, 
  Terminal, Bot, Star, ChevronDown, ChevronUp, Share2, Moon, Sun
} from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TEMPLATE } from "@/app/dashboard/_components/TemplateListSection";
import ChatMessage from "../../_components/ChatMessage";
import StreamingText from "../../_components/StreamingText";
import { Badge } from "@/components/ui/badge";

interface Props {
  aiOutput: string;
  loading: boolean;
  template?: TEMPLATE;
  formData?: Record<string, string>;
}

function OutputSection({ aiOutput, loading, template, formData = {} }: Props) {
  const [copied, setCopied] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamComplete, setStreamComplete] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Determine user prompt from form data
  const userPrompt = Object.entries(formData)
    .map(([key, value]) => `**${key}**: ${value}`)
    .join('\n\n');
    
  useEffect(() => {
    if (aiOutput && !loading) {
      setStreaming(true);
      setStreamComplete(false);
    }
  }, [aiOutput, loading]);
  
  useEffect(() => {
    // Scroll to bottom when new content appears
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [streaming, streamComplete, loading, aiOutput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(aiOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast.success("Content copied to clipboard!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        style: {
          borderRadius: "0.5rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        }
      });
    });
  };

  const handleDownload = () => {
    const blob = new Blob([aiOutput], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template?.name || 'ai-generated-content'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Content downloaded successfully!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      theme: darkMode ? "dark" : "light"
    });
  };

  return (
    <div className={cn(
      "shadow-xl border rounded-xl overflow-hidden flex flex-col h-[600px]",
      darkMode ? "bg-gray-900 border-gray-700" : "bg-white"
    )}>
      {/* Terminal-like header */}
      <div className={cn(
        "flex justify-between items-center px-4 py-3 border-b",
        darkMode ? "bg-gray-800 border-gray-700" : "bg-indigo-50 border-indigo-100"
      )}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          
          <div className="flex items-center gap-2">
            <Terminal className={cn(
              "h-4 w-4",
              darkMode ? "text-indigo-300" : "text-indigo-600"
            )} />
            <span className={cn(
              "font-medium text-sm",
              darkMode ? "text-gray-200" : "text-gray-700"
            )}>
              {template?.name || 'AI Output'} 
              {/* Add badge to show template category */}
              {template?.category && (
                <Badge variant="outline" className={cn(
                  "ml-2 py-0 text-xs",
                  darkMode ? "text-indigo-300 border-indigo-800" : "text-indigo-600 border-indigo-200"
                )}>
                  {template.category}
                </Badge>
              )}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={darkMode ? "outline" : "ghost"}
            size="icon"
            className={cn(
              "h-7 w-7", 
              darkMode ? "border-gray-700 hover:bg-gray-800" : "hover:bg-gray-100"
            )}
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </Button>
          
          <Button
            variant={darkMode ? "outline" : "ghost"}
            size="icon"
            className={cn(
              "h-7 w-7", 
              darkMode ? "border-gray-700 hover:bg-gray-800" : "hover:bg-gray-100"
            )}
            onClick={() => setShowToolbar(!showToolbar)}
            title={showToolbar ? "Hide toolbar" : "Show toolbar"}
          >
            {showToolbar ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Optional toolbar */}
      <AnimatePresence>
        {showToolbar && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={cn(
              "border-b px-4 py-2 flex justify-between items-center",
              darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-100"
            )}
          >
            <div className="flex items-center gap-2">
              <Bot className={cn("h-4 w-4", darkMode ? "text-green-400" : "text-green-600")} />
              <span className={cn(
                "text-xs font-medium", 
                darkMode ? "text-gray-300" : "text-gray-600"
              )}>
                AI-Generated Content
              </span>
              
              {streamComplete && (
                <Badge variant="outline" className={cn(
                  "ml-1 py-0 h-5", 
                  darkMode ? "bg-green-900/20 text-green-400 border-green-800" : "bg-green-50 text-green-700 border-green-200"
                )}>
                  Complete
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              {(aiOutput && !loading) && (
                <>
                  <Button 
                    variant={darkMode ? "outline" : "ghost"}
                    size="sm" 
                    onClick={handleDownload}
                    className={cn(
                      "text-xs h-7 flex gap-1 items-center",
                      darkMode ? "border-gray-700 hover:bg-gray-800" : "hover:bg-gray-100"
                    )}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Save</span>
                  </Button>
                  
                  <Button 
                    variant={copied ? "outline" : "default"}
                    size="sm" 
                    onClick={handleCopy}
                    disabled={copied}
                    className={cn(
                      "text-xs h-7 flex gap-1 items-center",
                      copied ? (
                        darkMode ? "border-green-700 bg-green-900/30 text-green-400" : "border-green-300 bg-green-50 text-green-700"
                      ) : ""
                    )}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content area */}
      <div 
        ref={containerRef}
        className={cn(
          "flex-1 overflow-y-auto relative",
          darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
        )}
      >
        {/* Empty state */}
        {!aiOutput && !loading && (
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center",
            darkMode ? "bg-gray-900" : "bg-white"
          )}>
            <div className={cn(
              "rounded-full w-16 h-16 flex items-center justify-center mb-4",
              darkMode ? "bg-gray-800" : "bg-gray-100"
            )}>
              <Clipboard className={cn(
                "h-8 w-8",
                darkMode ? "text-gray-500" : "text-gray-400"
              )} />
            </div>
            <h3 className={cn(
              "text-xl font-medium mb-2",
              darkMode ? "text-gray-300" : "text-gray-800"
            )}>
              Ready to generate
            </h3>
            <p className={cn(
              "max-w-sm text-center px-6",
              darkMode ? "text-gray-400" : "text-gray-500"
            )}>
              Fill in the form and submit to generate AI content.
            </p>
          </div>
        )}
        
        {/* Conversation interface */}
        <div className={cn(
          "flex flex-col p-4 gap-6",
          darkMode ? "bg-gray-900" : "bg-white"
        )}>
          {/* Only show user prompt if we have form data */}
          {Object.keys(formData).length > 0 && userPrompt && (
            <ChatMessage 
              content={userPrompt} 
              isAI={false} 
              darkMode={darkMode} 
            />
          )}
          
          {/* AI response */}
          {(aiOutput || loading) && (
            <ChatMessage 
              content={
                loading ? (
                  "Thinking..."
                ) : (
                  <StreamingText 
                    text={aiOutput}
                    isComplete={streamComplete}
                    onComplete={() => setStreamComplete(true)}
                    darkMode={darkMode}
                  />
                )
              } 
              isAI={true}
              isLoading={loading}
              icon={template?.icon}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
      
      {/* Footer status bar */}
      <div className={cn(
        "border-t px-4 py-2 text-xs flex items-center justify-between",
        darkMode ? "bg-gray-800 border-gray-700 text-gray-400" : "bg-gray-50 border-gray-100 text-gray-500"
      )}>
        <div className="flex items-center">
          {loading && (
            <div className="flex items-center gap-2">
              <RefreshCw className="h-3 w-3 animate-spin" />
              <span>Generating response...</span>
            </div>
          )}
          {streamComplete && (
            <div className="flex items-center gap-2">
              <span>Generation complete</span>
              <Star className="h-3 w-3 text-yellow-500" /> 
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          {aiOutput && !loading && (
            <>
              <span>
                {aiOutput.split(" ").length} words
              </span>
              <span>
                {aiOutput.length} characters
              </span>
            </>
          )}
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default OutputSection;