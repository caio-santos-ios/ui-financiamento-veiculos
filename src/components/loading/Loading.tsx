"use client";
import { loadingAtom } from "@/jotai/global/loading.jotai";
import { useAtom } from "jotai";

export const Loading = () => {
  const [loading] = useAtom(loadingAtom);
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-brand-100 dark:border-brand-900" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-500 animate-spin" />
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Carregando...</p>
    </div>
  );
};
