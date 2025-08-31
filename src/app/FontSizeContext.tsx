import React, { createContext, useContext, useState, useEffect } from "react";

interface FontSizeContextProps {
  fontSize: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const FontSizeContext = createContext<FontSizeContextProps | null>(null);

export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    const saved = localStorage.getItem("fontSize");
    if (saved) setFontSize(Number(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("fontSize", String(fontSize));
  }, [fontSize]);

  const increase = () => setFontSize((prev) => Math.min(prev + 2, 32));
  const decrease = () => setFontSize((prev) => Math.max(prev - 2, 12));
  const reset = () => setFontSize(16);

  return (
    <FontSizeContext.Provider value={{ fontSize, increase, decrease, reset }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const ctx = useContext(FontSizeContext);
  if (!ctx) throw new Error("useFontSize must be used within FontSizeProvider");
  return ctx;
};
