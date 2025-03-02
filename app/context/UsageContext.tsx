"use client";
import { createContext, useState, ReactNode } from "react";

// Context for tracking total usage
type TotalUsageContextType = {
  totalUsage: number;
  setTotalUsage: (usage: number) => void;
};

// Context for updating credit usage
type UpdateCreditUsageContextType = {
  updateCreditUsage: number | null;
  setUpdateCreditUsage: (timestamp: number) => void;
};

// Create contexts with default values
export const TotalUsageContext = createContext<TotalUsageContextType>({
  totalUsage: 0,
  setTotalUsage: () => {},
});

export const UpdateCreditUsageContext = createContext<UpdateCreditUsageContextType>({
  updateCreditUsage: null,
  setUpdateCreditUsage: () => {},
});

// Provider component for both contexts
interface UsageProviderProps {
  children: ReactNode;
}

export function UsageProvider({ children }: UsageProviderProps) {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<number | null>(null);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UpdateCreditUsageContext.Provider value={{ updateCreditUsage, setUpdateCreditUsage }}>
        {children}
      </UpdateCreditUsageContext.Provider>
    </TotalUsageContext.Provider>
  );
}