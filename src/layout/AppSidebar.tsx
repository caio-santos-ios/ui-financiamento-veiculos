"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { useAtom } from "jotai";
import { iconAtom } from "@/jotai/global/icons.jotai";
import { menuRoutinesAtom } from "@/jotai/global/menu.jotai";
import { NavItem } from "@/types/global/menu.type";

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleMobileSidebar } = useSidebar();
  const pathname = usePathname();
  const [icons] = useAtom(iconAtom);
  const [menu] = useAtom(menuRoutinesAtom);
  const [openSubmenu, setOpenSubmenu] = useState<{ index: number } | null>(null);
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);
  const isOpen = isExpanded || isHovered || isMobileOpen;

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({ ...prev, [key]: subMenuRefs.current[key]?.scrollHeight || 0 }));
      }
    }
  }, [openSubmenu]);

  const MdIcon = icons["MdDirectionsCar"];
  const ChevronDown = icons["MdKeyboardArrowDown"];
  const MenuIcon = icons["MdMenu"];

  return (
    <>
      <aside
        className={`fixed mt-0 flex flex-col lg:mt-0 top-0 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen z-50 border-r border-gray-200 transition-all duration-300 ease-in-out
          ${isOpen ? "w-[290px]" : "w-[90px]"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-800 ${!isOpen ? "justify-center px-4" : ""}`}>
          {MdIcon && <MdIcon size={28} className="text-brand-500 shrink-0" />}
          {isOpen && (
            <div>
              <span className="font-bold text-gray-900 dark:text-white text-base leading-tight">AutoFinance</span>
              <p className="text-xs text-gray-400">Simulador de Veículos</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {menu.map((item, index) => {
            const IconComp = icons[item.icon];
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isSubmenuOpen = openSubmenu?.index === index;
            const active = item.path ? isActive(item.path) : false;

            if (hasSubItems) {
              return (
                <div key={index} className="mb-1">
                  <button
                    onClick={() => setOpenSubmenu(isSubmenuOpen ? null : { index })}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${isSubmenuOpen ? "bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}
                      ${!isOpen ? "justify-center" : "justify-between"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {IconComp && <IconComp size={20} className="shrink-0" />}
                      {isOpen && <span>{item.name}</span>}
                    </div>
                    {isOpen && ChevronDown && (
                      <ChevronDown size={16} className={`transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`} />
                    )}
                  </button>
                  {isOpen && (
                    <div
                      ref={(el) => { subMenuRefs.current[`${index}`] = el; }}
                      className="overflow-hidden transition-all duration-300"
                      style={{ height: isSubmenuOpen ? `${subMenuHeight[`${index}`] || 0}px` : "0px" }}
                    >
                      {item.subItems?.map((sub, si) => {
                        const SubIcon = icons[sub.icon];
                        const subActive = sub.path ? isActive(sub.path) : false;
                        return (
                          <Link key={si} href={sub.path || "#"}
                            className={`flex items-center gap-3 pl-10 pr-3 py-2 rounded-lg text-sm transition-colors mt-0.5
                              ${subActive ? "bg-brand-500 text-white" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                          >
                            {SubIcon && <SubIcon size={16} />}
                            <span>{sub.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={index} href={item.path || "#"}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1
                  ${active ? "bg-brand-500 text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}
                  ${!isOpen ? "justify-center" : ""}
                `}
              >
                {IconComp && <IconComp size={20} className="shrink-0" />}
                {isOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden" onClick={toggleMobileSidebar} />
      )}
    </>
  );
};

export default AppSidebar;
