"use client";

import { TAmortizationRow } from "@/types/simulator/simulation.type";
import { maskCurrency } from "@/utils/mask.util";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type TProp = { data: TAmortizationRow[] };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-lg text-sm">
        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Mês {label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }} className="flex justify-between gap-6">
            <span>{entry.name}:</span>
            <span className="font-medium">{maskCurrency(entry.value)}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AmortizationChart({ data }: TProp) {
  const chartData = data.map((row) => ({
    mes: row.month,
    "Saldo Devedor": Number(row.balance.toFixed(2)),
    "Amortização": Number(row.principal.toFixed(2)),
    "Juros": Number(row.interest.toFixed(2)),
  }));

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/[0.03] p-6">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
        <span className="w-1.5 h-5 rounded-full bg-brand-500 inline-block" />
        Evolução da Dívida
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="colorAmort" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="colorJuros" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f04438" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f04438" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.4} />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              label={{ value: "Mês", position: "insideBottomRight", offset: -5, fontSize: 11, fill: "#9ca3af" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
              formatter={(value) => <span className="text-gray-600 dark:text-gray-400">{value}</span>}
            />
            <Area type="monotone" dataKey="Saldo Devedor" stroke="#3b82f6" strokeWidth={2} fill="url(#colorSaldo)" />
            <Area type="monotone" dataKey="Amortização" stroke="#16a34a" strokeWidth={2} fill="url(#colorAmort)" />
            <Area type="monotone" dataKey="Juros" stroke="#f04438" strokeWidth={2} fill="url(#colorJuros)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
