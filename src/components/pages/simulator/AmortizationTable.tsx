"use client";

import { useState } from "react";
import { TAmortizationRow } from "@/types/simulator/simulation.type";
import { maskCurrency } from "@/utils/mask.util";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

type TProp = { data: TAmortizationRow[] };

const PAGE_SIZE = 12;

export default function AmortizationTable({ data }: TProp) {
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? data : data.slice(0, PAGE_SIZE);

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/[0.03] p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-brand-500 inline-block" />
          Tabela de Amortização
          <span className="text-sm font-normal text-gray-400">({data.length} parcelas)</span>
        </h3>
        {data.length > PAGE_SIZE && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors"
          >
            {showAll ? "Ver menos" : `Ver todas (${data.length})`}
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table className="">
          <TableHeader>
            <TableRow>
              {["Parcela", "Prestação", "Amortização", "Juros", "Saldo Devedor"].map((h) => (
                <TableCell
                  key={h}
                  isHeader
                  className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-left whitespace-nowrap border-b border-gray-100 dark:border-white/5"
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayed.map((row, idx) => {
              const isLast = row.balance === 0;
              return (
                <TableRow
                  key={row.month}
                  className={`transition-colors
                    ${idx % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-gray-50/50 dark:bg-white/[0.01]"}
                    ${isLast ? "border-t-2 border-brand-200 dark:border-brand-800" : ""}
                    hover:bg-brand-50/30 dark:hover:bg-brand-900/10
                  `}
                >
                  <TableCell className="px-4 py-3 text-sm text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold
                      ${isLast ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>
                      {row.month}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                    {maskCurrency(row.installment)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-brand-600 dark:text-brand-400 whitespace-nowrap">
                    {maskCurrency(row.principal)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-error-500 whitespace-nowrap">
                    {maskCurrency(row.interest)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white whitespace-nowrap">
                    {maskCurrency(row.balance)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {!showAll && data.length > PAGE_SIZE && (
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-400">
            Exibindo {PAGE_SIZE} de {data.length} parcelas.{" "}
            <button onClick={() => setShowAll(true)} className="text-brand-500 hover:underline">
              Clique para ver todas.
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
