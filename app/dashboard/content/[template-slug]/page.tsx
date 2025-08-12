"use client";

import React, { useState, useContext } from 'react';
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import FormSection from "../_component/FormSection";
import OutputSection from "../_component/OutputSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { TotalUsageContext } from "@/app/context/TotalUsageContext";
import { UpdateCreditUsageContext } from "@/app/context/UpdateCreditUsageContext";
import { chatSession } from "@/utils/AiModal";
import Templates from '@/app/(data)/Templates';
import { TEMPLATE } from '../../_components/TemplateListSection';

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === props.params["template-slug"]
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const [currentFormData, setCurrentFormData] = useState<Record<string, string>>({});
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage } = useContext(TotalUsageContext);
  const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
  
  const GenerateAIContent = async (formData: Record<string, string>) => {
    if (totalUsage >= 10000) {
      alert("You've reached your credit limit. Please upgrade your plan to continue.");
      router.push("/dashboard/billing");
      return;
    }
    
    // Save the form data for display
    setCurrentFormData(formData);
    
    // Start loading
    setLoading(true);
    setAiOutput("");
    
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
    
    try {
      const result = await chatSession.sendMessage(FinalAIPrompt);
      const responseText = result?.response.text() || "";
      
      setAiOutput(responseText);
      
      await SaveInDb(
        JSON.stringify(formData),
        selectedTemplate?.slug,
        responseText
      );
      
      setUpdateCreditUsage(Date.now());
    } catch (error) {
      console.error("Error generating AI content:", error);
      setAiOutput("Sorry, there was an error generating your content. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const SaveInDb = async (formData: any, slug: any, aiRes: string) => {
    try {
      await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiRes,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };
  
  return (
    <div className="p-4 md:p-10 bg-background min-h-screen">
      <Link href="/dashboard">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormSection
          selectedTemplate={selectedTemplate}
          onSubmit={GenerateAIContent}
          loading={loading}
        />
        
        <OutputSection 
          aiOutput={aiOutput} 
          loading={loading}
          template={selectedTemplate}
          formData={currentFormData}
        />
      </div>
    </div>
  );
}

export default CreateNewContent;