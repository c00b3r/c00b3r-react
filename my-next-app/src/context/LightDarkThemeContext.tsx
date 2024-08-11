import React, { createContext, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const DarkLightThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <DarkLightThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkLightThemeContext.Provider>
  );
};

export default DarkLightThemeContext;
