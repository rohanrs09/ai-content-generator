"use client";

import React, { useState } from "react";
import { User, Bot, Copy, Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/app/context/ThemeContext";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { resolvedTheme: darkMode } = useTheme();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const blob = new Blob([message], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-content-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download file: ", err);
    } finally {
      setDownloading(false);
    }
  };

  if (isUser) {
    return (
      <div className={cn(
        "flex gap-3 p-4",
        darkMode ? "bg-muted/50 border-t border-border" : "bg-card border-t"
      )}>
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          darkMode ? "bg-primary" : "bg-primary"
        )}>
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">You</span>
            {timestamp && (
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            )}
          </div>
          <p className="text-foreground">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex gap-3 p-4",
      darkMode ? "bg-background" : "bg-muted"
    )}>
      <div className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full",
        darkMode ? "bg-muted" : "bg-muted"
      )}>
        <Bot className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">AI Assistant</span>
          {timestamp && (
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          )}
        </div>
        
        <div className={cn(
          "prose max-w-none",
          darkMode ? "prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-invert" : "prose-headings:text-foreground"
        )}>
          <div 
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-3 text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={downloading}
            className="h-8 px-3 text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            {downloading ? "Downloading..." : "Download"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;