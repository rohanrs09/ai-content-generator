"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Loader2, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TEMPLATE } from "../../_components/TemplateListSection";

interface FormProps {
  selectedTemplate: TEMPLATE | undefined;
  onSubmit: (data: Record<string, string>) => void;
  loading: boolean;
}

function FormSection({ selectedTemplate, onSubmit, loading }: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [completedFields, setCompletedFields] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Track completed fields
    if (value && !completedFields.includes(name)) {
      setCompletedFields(prev => [...prev, name]);
    } else if (!value && completedFields.includes(name)) {
      setCompletedFields(prev => prev.filter(field => field !== name));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow-lg border rounded-xl overflow-hidden">
      {/* Gradient Header - Fixed grid background */}
      <div className="bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 p-6 relative overflow-hidden">
        {/* Grid pattern with CSS background instead of utility class */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23fff' d='M1,1 L19,1 L19,19 L1,19 L1,1 Z M0,0 L20,0 L20,20 L0,20 L0,0 Z' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            maskImage: 'radial-gradient(white, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(white, transparent 70%)'
          }}
        ></div>
        
        <div className="relative flex items-center gap-4 z-10">
          {selectedTemplate?.icon && (
            <div className="bg-white/90 p-3 rounded-xl shadow-lg">
              <img 
                src={selectedTemplate.icon} 
                alt={selectedTemplate.name} 
                className="w-10 h-10 object-contain"
              />
            </div>
          )}
          
          <div>
            <h2 className="font-bold text-xl text-white">
              {selectedTemplate?.name || "Template"}
            </h2>
            <p className="text-sm text-white/80 mt-1 max-w-md">
              {selectedTemplate?.desc || "Generate AI content"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-7"
        >
          {selectedTemplate?.form?.map((item, index) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="space-y-2 relative"
            >
              {/* Label with animated underline on focus */}
              <label className={cn(
                "text-sm font-medium flex items-center gap-1.5 pb-1.5",
                focusedField === item.name ? "text-primary" : "text-gray-700"
              )}>
                {completedFields.includes(item.name) && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                {item.label} 
                {item.required && (
                  <span className="text-red-500 ml-0.5">*</span>
                )}
              </label>
              
              {/* Glowing border and hover effects for inputs */}
              {item.field === "input" ? (
                <div className="relative">
                  <Input
                    name={item.name}
                    value={formData[item.name] || ''}
                    onChange={handleInputChange}
                    required={item?.required}
                    placeholder={`Enter ${item.name}`}
                    className={cn(
                      "transition-all border-gray-200 rounded-lg py-2.5 px-4",
                      "focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "hover:border-gray-300",
                      focusedField === item.name && "border-primary/50 ring-2 ring-primary/20",
                      completedFields.includes(item.name) && "bg-green-50/30"
                    )}
                    disabled={loading}
                    onFocus={() => setFocusedField(item.name)}
                    onBlur={() => setFocusedField(null)}
                  />
                  {completedFields.includes(item.name) && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </motion.div>
                  )}
                </div>
              ) : item.field === "textarea" ? (
                <div className="relative">
                  <Textarea
                    name={item.name}
                    value={formData[item.name] || ''}
                    onChange={handleInputChange}
                    required={item?.required}
                    placeholder={`Enter your ${item.name} details here...`}
                    className={cn(
                      "min-h-[140px] transition-all border-gray-200 rounded-lg py-3 px-4",
                      "focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "hover:border-gray-300 resize-y",
                      focusedField === item.name && "border-primary/50 ring-2 ring-primary/20",
                      completedFields.includes(item.name) && "bg-green-50/30"
                    )}
                    disabled={loading}
                    onFocus={() => setFocusedField(item.name)}
                    onBlur={() => setFocusedField(null)}
                  />
                  {completedFields.includes(item.name) && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-3"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </motion.div>
                  )}
                </div>
              ) : null}
              
              {/* Field description hint */}
              {item.name && (
                <p className="text-xs text-gray-500 mt-1.5 ml-1">
                  {item.field === "textarea" 
                    ? "Provide enough details for better AI results"
                    : `Enter ${item.name} to customize your AI output`}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-10"
        >
          {/* Animated Submit Button */}
          <Button 
            type="submit" 
            className="w-full group flex items-center justify-center gap-2 py-6 relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500" 
            disabled={loading}
          >
            {/* Fixed radial gradient */}
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 60%)'
              }}
            ></span>
            
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
                <span>Generate AI Content</span>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </>
            )}
          </Button>
          
          {loading && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mt-3"
            >
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                  initial={{ width: "5%" }}
                  animate={{ 
                    width: "95%", 
                    transition: { duration: 20, ease: "easeInOut" }
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 min-w-[80px] text-center">
                Processing...
              </span>
            </motion.div>
          )}
        </motion.div>
      </form>
    </div>
  );
}

export default FormSection;