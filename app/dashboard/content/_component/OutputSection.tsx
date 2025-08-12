"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Copy, Check, Download, Clipboard, RefreshCw, 
  Terminal, Bot, Star, ChevronDown, ChevronUp
} from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TEMPLATE } from "@/app/dashboard/_components/TemplateListSection";
import ChatMessage from "../../_components/ChatMessage";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/app/context/ThemeContext";

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
  const [showToolbar, setShowToolbar] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme: darkMode } = useTheme();
  
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
    <div className="shadow-xl border border-border rounded-xl overflow-hidden flex flex-col h-[600px] bg-card">
      {/* Terminal-like header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-border bg-muted">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm text-foreground">
              {template?.name || 'AI Output'} 
              {/* Add badge to show template category */}
              {template?.category && (
                <Badge variant="outline" className="ml-2 py-0 text-xs border-primary/20 text-primary">
                  {template.category}
                </Badge>
              )}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-accent"
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
            className="border-b border-border px-4 py-2 flex justify-between items-center bg-muted"
          >
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-medium text-muted-foreground">
                AI-Generated Content
              </span>
              
              {streamComplete && (
                <Badge variant="outline" className="ml-1 py-0 h-5 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                  Complete
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              {(aiOutput && !loading) && (
                <>
                  <Button 
                    variant="ghost"
                    size="sm" 
                    onClick={handleDownload}
                    className="text-xs h-7 flex gap-1 items-center hover:bg-accent"
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
                      copied ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-400" : ""
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
        className="flex-1 overflow-y-auto relative bg-card text-foreground"
      >
        {/* Empty state */}
        {!aiOutput && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card">
            <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 bg-muted">
              <Clipboard className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2 text-foreground">
              Ready to generate
            </h3>
            <p className="max-w-sm text-center px-6 text-muted-foreground">
              Fill in the form and submit to generate AI content.
            </p>
          </div>
        )}
        
        {/* Conversation interface */}
        <div className="flex flex-col p-4 gap-6 bg-card">
          {/* Only show user prompt if we have form data */}
          {Object.keys(formData).length > 0 && userPrompt && (
            <ChatMessage 
              message={userPrompt} 
              isUser={true} 
            />
          )}
          
          {/* AI response */}
          {(aiOutput || loading) && (
            <ChatMessage 
              message={loading ? "Thinking..." : aiOutput}
              isUser={false}
            />
          )}
        </div>
      </div>
      
      {/* Footer status bar */}
      <div className="border-t border-border px-4 py-2 text-xs flex items-center justify-between bg-muted text-muted-foreground">
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
    </div>
  );
}

export default OutputSection;