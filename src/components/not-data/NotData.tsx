import { MdOutlineScreenSearchDesktop } from "react-icons/md";

export const NotData = () => (
  <div className="flex justify-center items-center py-16">
    <div className="text-gray-400 dark:text-gray-600 flex flex-col justify-center items-center gap-4">
      <MdOutlineScreenSearchDesktop size={80} />
      <h1 className="text-lg">Nenhum registro foi encontrado</h1>
    </div>
  </div>
);
