"use client";
import Button from "../ui/button/Button";
import ModalV2 from "../ui/modalV2";
import { GoAlert } from "react-icons/go";

type TProp = {
  isOpen: boolean;
  closeModal: () => void;
  confirm: () => void;
  title: string;
  description?: string;
};

export const ModalDelete = ({ isOpen, closeModal, confirm, title, description = "Deseja excluir esse registro?" }: TProp) => (
  <ModalV2 isOpen={isOpen} onClose={closeModal} title={title}>
    <div className="flex flex-col p-6">
      <div className="h-[150px] flex flex-col justify-center items-center gap-3">
        <GoAlert className="text-red-500" size={60} />
        <h1 className="font-semibold text-lg text-gray-800 dark:text-white/90 text-center">{description}</h1>
      </div>
      <div className="flex items-center gap-3 mt-6 justify-end">
        <Button size="sm" variant="outline" onClick={closeModal}>Cancelar</Button>
        <Button size="sm" variant="primary" onClick={confirm}>Confirmar</Button>
      </div>
    </div>
  </ModalV2>
);
