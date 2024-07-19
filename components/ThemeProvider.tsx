"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContextProvider";
import ThemeContextProvider from "@/context/ThemeContextProvider";
import { ThemeProvider } from "next-themes";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
