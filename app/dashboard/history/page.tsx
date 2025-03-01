"use client";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import { AIOutput } from "@/utils/schema";
import { Button } from "@/components/ui/button";
import Templates from "@/app/(data)/Templates";
import { db } from "@/utils/db";
import { useEffect, useState } from "react";
import { Calendar, ChevronDown, Copy, FileText, Loader2, RefreshCw, Search } from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string | null;
  createdAt: string | null;
}

const History = () => {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState<HISTORY[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (!user || !user.primaryEmailAddress) {
        console.error("No user logged in or missing email");
        return;
      }

      const userId = user.primaryEmailAddress.emailAddress;
      
      // Fetch data in descending order (newest first)
      const results = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, userId))
        .orderBy(desc(AIOutput.createdAt));  // Explicitly order by createdAt DESC

      console.log("Fetched results:", results); // Log to confirm order
      setData(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchData();
    }
  }, [isLoaded, user]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      toast.success("Successfully copied content", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    });
  };

  const filteredData = searchTerm 
    ? data.filter(item => 
        item.aiResponse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Templates.find(t => t.slug === item.templateSlug)?.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const toggleExpand = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // Helper function to format dates correctly
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Unknown date";
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) return "Invalid date";
      
      // Format date and time with explicit options to ensure consistent display
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      });
      
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
      
      return `${formattedDate} • ${formattedTime}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date error";
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-gray-500 animate-pulse">Loading your content history...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-white">
            <h2 className="font-bold text-3xl">Content History</h2>
            <p className="mt-2 opacity-90">Access and manage your previously generated AI content</p>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text"
                placeholder="Search by content or template..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              onClick={fetchData} 
              className="flex gap-2 items-center min-w-[120px]" 
              variant="outline"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="grid gap-6">
          {filteredData.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-12 text-center shadow-sm border"
            >
              <div className="mx-auto bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No content history found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm ? 'No results match your search criteria. Try a different search term.' : 'Generate some content to see your history here.'}
              </p>
            </motion.div>
          ) : (
            filteredData.map((item, index) => {
              const template = Templates.find((t) => t.slug === item.templateSlug);
              const isExpanded = expandedItem === item.id;
              const wordCount = item.aiResponse ? item.aiResponse.split(" ").length : 0;
              
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border overflow-hidden"
                >
                  <div className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {template && (
                        <div className="bg-violet-100 p-3 rounded-lg">
                          <Image
                            src={template.icon}
                            alt={template.name}
                            width={36}
                            height={36}
                            className="object-contain"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-lg text-gray-900">
                          {template?.name || "Unknown Template"}
                        </h3>
                        
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(item.createdAt)}
                          </div>
                          
                          <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                            <FileText className="h-3.5 w-3.5" />
                            {wordCount} words
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <Button
                        className="flex gap-2"
                        onClick={() => item.aiResponse && handleCopy(item.aiResponse)}
                        disabled={!item.aiResponse}
                        size="sm"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex gap-2"
                        onClick={() => toggleExpand(item.id)}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        {isExpanded ? 'Hide' : 'View'}
                      </Button>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t px-6 py-4">
                      <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-gray-700">
                        {item.aiResponse || "No content available"}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default History;