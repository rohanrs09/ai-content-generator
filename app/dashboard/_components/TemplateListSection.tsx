import Templates from "@/app/(data)/Templates";
import React, { useEffect, useMemo, useState } from "react";
import TemplateCard from "./TemplateCard";
import { motion } from "framer-motion";
import { X, Filter, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

function TemplateListSection({ userSearchInput }: { userSearchInput?: string }) {
  // Parse search input to extract category filter
  const parseSearchInput = (input: string = "") => {
    const categoryMatch = input.match(/\[category:([^\]]+)\]/);
    let category = null;
    let searchText = input;
    
    if (categoryMatch) {
      category = categoryMatch[1];
      // Remove the category part from search text
      searchText = input.replace(/\s*\[category:[^\]]+\]\s*/, "").trim();
    }
    
    return { searchText, category };
  };
  
  // Filter templates based on search text and category
  const filteredTemplates = useMemo(() => {
    if (!userSearchInput) return Templates;
    
    const { searchText, category } = parseSearchInput(userSearchInput);
    console.log("Parsed search:", { searchText, category });
    
    return Templates.filter((template) => {
      // Match by text (name or description)
      const matchesSearch =
        !searchText ||
        template.name.toLowerCase().includes(searchText.toLowerCase()) ||
        template.desc.toLowerCase().includes(searchText.toLowerCase());
      
      // Match by category
      const matchesCategory =
        !category || template.category.toLowerCase() === category.toLowerCase();

      // Return true only if both conditions are met
      return matchesSearch && matchesCategory;
    });
  }, [userSearchInput]);

  // Get the actual filtered values for display
  const { searchText: currentSearchText, category: currentCategory } = 
    parseSearchInput(userSearchInput || "");
  
  // Get unique categories for category breakdown
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(Templates.map(template => template.category)))
      .sort((a, b) => a.localeCompare(b));
  }, []);
  
  // Category counts for filtered results
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    filteredTemplates.forEach(template => {
      counts[template.category] = (counts[template.category] || 0) + 1;
    });
    
    return counts;
  }, [filteredTemplates]);
  
  // Add state to hold templateList
  const [templateList, setTemplateList] = useState(Templates);

  // Update template list when filtered templates change
  useEffect(() => {
    setTemplateList(filteredTemplates);
  }, [filteredTemplates]);

  return (
    <div className="px-4 md:px-6 py-6">
      {/* Filter indicators and results summary */}
      {userSearchInput && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-card rounded-xl border p-4 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Filter className="h-4 w-4" />
                <span>
                  {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'} found
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 items-center">
                {currentSearchText && (
                  <span className="bg-muted text-foreground text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Search className="h-3 w-3" />
                    {currentSearchText}
                  </span>
                )}
                
                {currentCategory && (
                  <span className="bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Filter className="h-3 w-3" />
                    {currentCategory}
                  </span>
                )}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs gap-1.5 h-8 px-3"
              onClick={() => window.location.href = '/dashboard'}
            >
              <X className="h-3.5 w-3.5" />
              Clear filters
            </Button>
          </div>
          
          {/* Category breakdown */}
          <div className="mt-4 border-t border-border pt-3">
            <div className="flex items-center gap-2 mb-2">
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Results by category:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div 
                  key={category}
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md flex items-center gap-1"
                >
                  {category} <span className="bg-border px-1.5 py-0.5 rounded-full">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Empty state */}
      {templateList.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-12 text-center shadow-sm border mt-8"
        >
          <div className="mx-auto bg-muted rounded-full w-20 h-20 flex items-center justify-center mb-4">
            <Filter className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">No matching templates</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            No templates match your current filters. Try different search terms or categories.
          </p>
          <Button 
            onClick={() => window.location.href = '/dashboard'} 
            className="mt-6"
          >
            Clear filters
          </Button>
        </motion.div>
      )}
      
      {/* Template Grid - UPDATED FOR 4 CARDS PER ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {templateList.map((item) => (
          <motion.div 
            key={item.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1.0], // Smooth easing
            }}
          >
            <TemplateCard {...item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TemplateListSection;