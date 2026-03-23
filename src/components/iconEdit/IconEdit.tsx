import { MdEdit } from "react-icons/md";

type TProp = { action: string; obj?: any; getObj: (obj: any, action: string) => void };

export const IconEdit = ({ obj, getObj, action }: TProp) => (
  <div title="Editar" onClick={() => getObj(obj, action)} className="cursor-pointer text-yellow-400 hover:text-yellow-500">
    <MdEdit size={18} />
  </div>
);
