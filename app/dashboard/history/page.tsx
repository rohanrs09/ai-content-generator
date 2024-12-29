"use client";

import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import { TEMPLATE } from "../_components/TemplateListSection";
import { AIOutput } from "@/utils/schema";
import { Button } from "@/components/ui/button";
import Templates from "@/app/(data)/Templates";
import { db } from "@/utils/db";
import { useEffect, useState } from "react";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string | null;
  createdAt: string | null;
}

const History = () => {
  const [data, setData] = useState<HISTORY[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const user = await currentUser();

      if (user) {
        const userId = user.id;
        const results = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, userId))
          .orderBy(desc(AIOutput.createdAt));

        setData(results);
      } else {
        console.error("No user logged in");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "#f4f4f4",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div className="flex flex-col">
          <h2 className="font-bold text-3xl mb-2">History</h2>
          <p className="text-gray-500 text-lg">
            Search your previously generated AI content
          </p>
        </div>
        <Button onClick={fetchData}>Refresh</Button>
      </header>
      <div style={{ padding: "1rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>Template</th>
              <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>AI Response</th>
              <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>Words</th>
              <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>Copy</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const template = Templates.find((t) => t.slug === item.templateSlug);
              return (
                <tr key={item.id}>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {template && (
                      <>
                        <Image
                          src={template.icon}
                          alt={template.name}
                          width={50}
                          height={50}
                        />
                        {template.name}
                      </>
                    )}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {item.aiResponse || ""}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    {item.aiResponse ? item.aiResponse.split(" ").length : 0}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                    <Button
                      onClick={() => {
                        if (item.aiResponse) {
                          navigator.clipboard.writeText(item.aiResponse);
                        }
                      }}
                    >
                      Copy
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
