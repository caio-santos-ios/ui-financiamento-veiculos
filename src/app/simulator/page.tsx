import { Metadata } from "next";
import Link from "next/link";
import PageBreadcrumb from "@/components/pageBreadcrumb/PageBreadcrumb";
import Button from "@/components/ui/button/Button";
import SimulationTable from "@/components/pages/simulator/SimulationTable";

export const metadata: Metadata = {
  title: "Financiamento | Simulações",
  description: "Simulador de financiamento de veículos",
};

export default function SimulatorPage() {
  return (
    <div>
      <PageBreadcrumb pageIcon="MdDirectionsCar" pageTitle="Simulações" pageSubTitle="Financiamento" />
      <div className="flex justify-end mb-2">
        <Link href="/simulator/create">
          <Button type="button" size="sm">Nova Simulação</Button>
        </Link>
      </div>
      <SimulationTable />
    </div>
  );
}
