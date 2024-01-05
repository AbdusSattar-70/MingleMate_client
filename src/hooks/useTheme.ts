import { useState, useEffect } from "react";
import { PICK_THEME } from "../utils/constant";

interface ThemeContextProps {
  theme: string;
  toggleTheme: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useTheme = (): ThemeContextProps => {
  const getLocalTheme: string | null = localStorage.getItem(PICK_THEME.THEME);
  const [theme, setTheme] = useState<string>(
    getLocalTheme ? getLocalTheme : PICK_THEME.LIGHT
  );

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setTheme(PICK_THEME.DARK) : setTheme(PICK_THEME.LIGHT);
  };

  useEffect(() => {
    localStorage.setItem(PICK_THEME.THEME, theme);
    const htmlElement: HTMLHtmlElement | null = document.querySelector("html");

    if (htmlElement) {
      htmlElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
