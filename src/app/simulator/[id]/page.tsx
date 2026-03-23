import { Metadata } from "next";
import Link from "next/link";
import PageBreadcrumb from "@/components/pageBreadcrumb/PageBreadcrumb";
import Button from "@/components/ui/button/Button";
import SimulationForm from "@/components/pages/simulator/SimulationForm";

export const metadata: Metadata = {
  title: "Financiamento | Simulador",
  description: "Simulador de financiamento de veículos",
};

export default async function SimulatorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <PageBreadcrumb pageIcon="MdDirectionsCar" pageTitle="Simulador" pageSubTitle="Financiamento" />
      <div className="flex justify-end mb-2">
        <Link href="/simulator">
          <Button type="button" variant="outline" size="sm">Voltar</Button>
        </Link>
      </div>
      <SimulationForm id={id} />
    </div>
  );
}
