"use client";

import { TSimulation } from "@/types/simulator/simulation.type";
import { maskCurrency } from "@/utils/mask.util";

type TProp = { simulation: TSimulation };

type CardItem = {
  label: string;
  value: string;
  accent?: boolean;
  highlight?: "green" | "red" | "blue" | "default";
};

export default function SimulationResultCard({ simulation }: TProp) {
  const cards: CardItem[] = [
    {
      label: "Valor Financiado",
      value: maskCurrency(simulation.financedAmount),
      highlight: "blue",
    },
    {
      label: "Valor da Parcela",
      value: maskCurrency(simulation.installmentValue),
      accent: true,
      highlight: "green",
    },
    {
      label: "Total Pago",
      value: maskCurrency(simulation.totalPaid),
      highlight: "default",
    },
    {
      label: "Total de Juros",
      value: maskCurrency(simulation.totalInterest),
      highlight: "red",
    },
  ];

  const highlightClasses: Record<string, string> = {
    green: "border-brand-400 dark:border-brand-600",
    red: "border-error-400 dark:border-error-600",
    blue: "border-blue-400 dark:border-blue-600",
    default: "border-gray-200 dark:border-white/5",
  };

  const valueClasses: Record<string, string> = {
    green: "text-brand-600 dark:text-brand-400",
    red: "text-error-600 dark:text-error-400",
    blue: "text-blue-600 dark:text-blue-400",
    default: "text-gray-800 dark:text-white",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/[0.03] p-6">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
        <span className="w-1.5 h-5 rounded-full bg-brand-500 inline-block" />
        Resultado da Simulação
        {simulation.vehicleName && (
          <span className="ml-2 text-sm font-normal text-gray-400">— {simulation.vehicleName}</span>
        )}
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const hk = card.highlight ?? "default";
          return (
            <div
              key={card.label}
              className={`rounded-xl border-l-4 bg-gray-50 dark:bg-gray-800/50 px-5 py-4 ${highlightClasses[hk]}`}
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
              <p className={`text-lg font-bold ${valueClasses[hk]}`}>{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-500 dark:text-gray-400">
        <div>
          <span className="font-medium text-gray-700 dark:text-gray-300">Parcelas: </span>
          {simulation.installments}x
        </div>
        <div>
          <span className="font-medium text-gray-700 dark:text-gray-300">Taxa Mensal: </span>
          {simulation.monthlyInterestRate?.toFixed ? simulation.monthlyInterestRate.toFixed(2) : simulation.monthlyInterestRate}%
        </div>
        <div>
          <span className="font-medium text-gray-700 dark:text-gray-300">Entrada: </span>
          {maskCurrency(simulation.downPayment)}
        </div>
        <div>
          <span className="font-medium text-gray-700 dark:text-gray-300">Valor do Veículo: </span>
          {maskCurrency(simulation.vehicleValue)}
        </div>
      </div>
    </div>
  );
}
