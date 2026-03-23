"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { api } from "@/service/api.service";
import { configApi, resolveResponse } from "@/service/config.service";
import { loadingAtom } from "@/jotai/global/loading.jotai";
import { paginationAtom } from "@/jotai/global/pagination.jotai";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "@/components/tables/Pagination";
import { IconEdit } from "@/components/iconEdit/IconEdit";
import { IconDelete } from "@/components/iconDelete/IconDelete";
import { ModalDelete } from "@/components/modalDelete/ModalDelete";
import { NotData } from "@/components/not-data/NotData";
import { useModal } from "@/hooks/useModal";
import { maskDate, maskCurrency } from "@/utils/mask.util";
import { TSimulation, ResetSimulation } from "@/types/simulator/simulation.type";

export default function SimulationTable() {
  const [_, setLoading] = useAtom(loadingAtom);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const { isOpen, openModal, closeModal } = useModal();
  const [simulation, setSimulation] = useState<TSimulation>(ResetSimulation);
  const router = useRouter();

  const getAll = async (page: number) => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/simulations?deleted=false&orderBy=createdAt&sort=desc&pageSize=10&pageNumber=${page}`,
        configApi()
      );
      const result = data.result;
      setPagination({
        currentPage: result.currentPage,
        data: result.data,
        sizePage: result.pageSize,
        totalPages: result.totalPages,
        totalCount: result.totalCount,
      });
    } catch (error) {
      resolveResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const destroy = async () => {
    try {
      setLoading(true);
      await api.delete(`/simulations/${simulation.id}`, configApi());
      resolveResponse({ status: 200, message: "Simulação excluída com sucesso" });
      closeModal();
      await getAll(1);
    } catch (error) {
      resolveResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const getObj = (obj: any, action: string) => {
    setSimulation(obj);
    if (action === "edit") router.push(`/simulator/${obj.id}`);
    if (action === "delete") openModal();
  };

  useEffect(() => { getAll(1); }, []);

  return (
    <>
      {pagination.data.length > 0 ? (
        <>
          <div className="rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/[0.03] mb-3 overflow-hidden">
            <div className="max-w-full overflow-x-auto">
              <Table className="divide-y divide-gray-100 dark:divide-white/5">
                <TableHeader className="border-b border-gray-100 dark:border-white/5">
                  <TableRow>
                    {["Veículo", "Cliente", "Valor do Veículo", "Entrada", "Parcelas", "Valor Parcela", "Total Pago", "Criado em", "Ações"].map((h) => (
                      <TableCell key={h} isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                  {pagination.data.map((x: any) => (
                    <TableRow key={x.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                        {x.vehicleName || "—"}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {x.clientName || "—"}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {maskCurrency(x.vehicleValue)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {maskCurrency(x.downPayment)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                          {x.installments}x
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium">
                        {maskCurrency(x.installmentValue)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {maskCurrency(x.totalPaid)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {maskDate(x.createdAt)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-3">
                          <IconEdit obj={x} getObj={getObj} action="edit" />
                          <IconDelete obj={x} getObj={getObj} action="delete" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalCount={pagination.totalCount}
            totalData={pagination.data.length}
            onPageChange={getAll}
          />
        </>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/[0.03]">
          <NotData />
        </div>
      )}

      <ModalDelete
        isOpen={isOpen}
        closeModal={closeModal}
        confirm={destroy}
        title="Excluir Simulação"
        description="Deseja excluir essa simulação? Essa ação não pode ser desfeita."
      />
    </>
  );
}
