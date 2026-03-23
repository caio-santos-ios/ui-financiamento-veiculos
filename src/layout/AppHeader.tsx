"use client";
import React from "react";
import { useSidebar } from "../context/SidebarContext";
import { useTheme } from "../context/ThemeContext";
import { useAtom } from "jotai";
import { iconAtom } from "@/jotai/global/icons.jotai";

const AppHeader: React.FC = () => {
  const { toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const [icons] = useAtom(iconAtom);

  const MenuIcon = icons["MdMenu"];
  const SunIcon = icons["MdLightMode"];
  const MoonIcon = icons["MdDarkMode"];

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-theme-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors"
        >
          {MenuIcon && <MenuIcon size={20} />}
        </button>
        <button
          onClick={toggleMobileSidebar}
          className="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors"
        >
          {MenuIcon && <MenuIcon size={20} />}
        </button>
        <div>
          <h1 className="text-sm font-semibold text-gray-800 dark:text-white">Simulador de Financiamento</h1>
          <p className="text-xs text-gray-400">Veículos · Tabela Price</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors"
          title={theme === "dark" ? "Modo claro" : "Modo escuro"}
        >
          {theme === "dark"
            ? SunIcon && <SunIcon size={20} />
            : MoonIcon && <MoonIcon size={20} />
          }
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
