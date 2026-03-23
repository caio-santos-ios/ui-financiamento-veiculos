import { FaTrash } from "react-icons/fa";

type TProp = { action: string; obj?: any; getObj: (obj: any, action: string) => void };

export const IconDelete = ({ obj, getObj, action }: TProp) => (
  <div title="Excluir" onClick={() => getObj(obj, action)} className="cursor-pointer text-red-400 hover:text-red-500">
    <FaTrash size={16} />
  </div>
);
