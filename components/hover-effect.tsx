"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion } from "framer-motion";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    badge?: string;
    gradient?: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div
                className={`absolute inset-0 ${
                  item.gradient || "from-violet-600 to-indigo-600"
                } opacity-0 transition-opacity group-hover:opacity-100 h-1 bg-gradient-to-r`}
              ></div>
              <div className="p-6">
                {item.badge && (
                  <div className="mb-4">
                    <span className={`inline-flex items-center rounded-full ${
                      item.gradient ? 
                      `bg-gradient-to-r ${item.gradient.replace('from-', 'from-').replace('to-', 'to-')}/20 text-${item.gradient.split('-')[1]}-700` : 
                      "bg-purple-100 text-purple-800"} 
                      px-3 py-0.5 text-xs font-medium`}
                    >
                      {item.badge}
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};