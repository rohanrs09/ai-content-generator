import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: props) {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput]);

  const handleButtonClick = () => {
    // copy markdown content
    const editorInstance = editorRef.current.getInstance();
    const markdown = editorInstance.getMarkdown();
    navigator.clipboard.writeText(markdown).then(() => {
      // show toast notification
      toast.success("Sucess copied Content", {
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

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button className="flex gap-2" onClick={handleButtonClick}>
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will be here "
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />
      <ToastContainer />
    </div>
  );
}

export default OutputSection;
