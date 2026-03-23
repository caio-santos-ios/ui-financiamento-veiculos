import { NavItem } from "@/types/global/menu.type";
import { atom } from "jotai";

export const menuRoutinesAtom = atom<NavItem[]>([
  {
    name: "Simulações",
    icon: "MdDirectionsCar",
    path: "/simulator",
    code: "SIMULATOR",
    authorized: true,
  },
]);
