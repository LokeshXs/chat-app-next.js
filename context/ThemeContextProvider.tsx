import { useContext, createContext, useState } from "react";

type stateType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const initialState: stateType = {
  theme: "",
  setTheme: () => {},
};

export const ThemeContext = createContext<stateType>(initialState);

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
