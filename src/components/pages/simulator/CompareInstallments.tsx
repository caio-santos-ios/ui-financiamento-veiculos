"use client";

import { TInstallmentOption } from "@/types/simulator/simulation.type";
import { maskCurrency } from "@/utils/mask.util";

type TProp = {
  options: TInstallmentOption[];
  bestInstallments: number;
  currentInstallments: number;
  onSelect: (n: number) => void;
};

export default function CompareInstallments({ options, bestInstallments, currentInstallments, onSelect }: TProp) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/[0.03] p-6">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
        <span className="w-1.5 h-5 rounded-full bg-brand-500 inline-block" />
        Comparativo de Parcelas
      </h3>
      <p className="text-xs text-gray-400 mb-5 ml-4">
        Clique em uma opção para selecioná-la e recalcular
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {options.map((opt) => {
          const isBest = opt.installments === bestInstallments;
          const isCurrent = opt.installments === currentInstallments;

          return (
            <button
              key={opt.installments}
              type="button"
              onClick={() => onSelect(opt.installments)}
              className={`relative rounded-xl border-2 p-4 text-left transition-all hover:scale-[1.02]
                ${isCurrent
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                  : isBest
                  ? "border-brand-300 dark:border-brand-700 bg-brand-25 dark:bg-brand-950/30"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/30 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
            >
              {isBest && (
                <span className="absolute -top-2.5 left-3 bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ★ MELHOR
                </span>
              )}

              <div className="flex items-baseline gap-1 mb-3">
                <span className={`text-2xl font-bold ${isCurrent ? "text-brand-600 dark:text-brand-400" : "text-gray-800 dark:text-white"}`}>
                  {opt.installments}
                </span>
                <span className="text-sm text-gray-400">parcelas</span>
              </div>

              <div className="space-y-1.5">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Parcela</p>
                  <p className={`text-sm font-semibold ${isCurrent ? "text-brand-600 dark:text-brand-400" : "text-gray-700 dark:text-gray-300"}`}>
                    {maskCurrency(opt.installmentValue)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Total Pago</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{maskCurrency(opt.totalPaid)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Juros</p>
                  <p className="text-sm text-error-500">{maskCurrency(opt.totalInterest)}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
