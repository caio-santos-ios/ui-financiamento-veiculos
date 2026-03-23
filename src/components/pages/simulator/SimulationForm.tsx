"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { api } from "@/service/api.service";
import { configApi, resolveResponse } from "@/service/config.service";
import { loadingAtom } from "@/jotai/global/loading.jotai";
import { TSimulation, TSimulationForm, ResetSimulationForm, TInstallmentOption, TAmortizationRow } from "@/types/simulator/simulation.type";
import { maskCurrency } from "@/utils/mask.util";
import { convertToNumber } from "@/utils/convert.util";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import SimulationResultCard from "./SimulationResultCard";
import AmortizationChart from "./AmortizationChart";
import AmortizationTable from "./AmortizationTable";
import CompareInstallments from "./CompareInstallments";
import { NumericFormat } from "react-number-format";

type TProp = { id?: string };

const INSTALLMENT_OPTIONS = [24, 36, 48, 60];

export default function SimulationForm({ id }: TProp) {
  const [_, setLoading] = useAtom(loadingAtom);
  const [result, setResult] = useState<TSimulation | null>(null);
  const [compareData, setCompareData] = useState<TInstallmentOption[]>([]);
  const [bestInstallments, setBestInstallments] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<TSimulationForm>({
    defaultValues: ResetSimulationForm,
  });

  const watchedInstallments = watch("installments");

  // Load existing simulation for edit
  useEffect(() => {
    if (id && id !== "create") {
      setIsEditing(true);
      loadSimulation(id);
    }
  }, [id]);

  const loadSimulation = async (simId: string) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/simulations/${simId}`, configApi());
      const sim = data.result.data;
      reset({
        vehicleValue: sim.vehicleValue?.toString().replace(".", ",") ?? "",
        downPayment: sim.downPayment?.toString().replace(".", ",") ?? "",
        monthlyInterestRate: sim.monthlyInterestRate?.toString().replace(".", ",") ?? "1.5",
        installments: sim.installments ?? 48,
        vehicleName: sim.vehicleName ?? "",
        clientName: sim.clientName ?? "",
      });
      setResult(sim);
    } catch (error) {
      resolveResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const onCalculate = async (formData: TSimulationForm) => {
    try {
      setLoading(true);
      const vehicleValue = convertToNumber(formData.vehicleValue);
      const downPayment = convertToNumber(formData.downPayment);
      const monthlyInterestRate = convertToNumber(formData.monthlyInterestRate);

      const payload = {
        vehicleValue,
        downPayment,
        monthlyInterestRate,
        installments: Number(formData.installments),
      };

      const { data } = await api.post("/simulations/calculate", payload, configApi());
      const calc = data.result.data;
      setResult({ ...calc, vehicleName: formData.vehicleName, clientName: formData.clientName });

      // Compare installments
      const { data: cmpData } = await api.get(
        `/simulations/compare?vehicleValue=${vehicleValue}&downPayment=${downPayment}&monthlyInterestRate=${monthlyInterestRate}`,
        configApi()
      );
      setCompareData(cmpData.result.data.options);
      setBestInstallments(cmpData.result.data.bestInstallments);
    } catch (error) {
      resolveResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (formData: TSimulationForm) => {
    try {
      setLoading(true);
      const vehicleValue = convertToNumber(formData.vehicleValue);
      const downPayment = convertToNumber(formData.downPayment);
      const monthlyInterestRate = convertToNumber(formData.monthlyInterestRate);

      const payload = {
        vehicleValue,
        downPayment,
        monthlyInterestRate,
        installments: Number(formData.installments),
        vehicleName: formData.vehicleName,
        clientName: formData.clientName,
      };

      if (isEditing && id) {
        await api.put("/simulations", { ...payload, id }, configApi());
        resolveResponse({ status: 200, message: "Simulação atualizada com sucesso!" });
      } else {
        await api.post("/simulations", payload, configApi());
        resolveResponse({ status: 201, message: "Simulação salva com sucesso!" });
      }
      router.push("/simulator");
    } catch (error) {
      resolveResponse(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3 p-6">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-brand-500 inline-block" />
          Dados do Financiamento
        </h3>

        <form onSubmit={handleSubmit(onCalculate)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <Label htmlFor="vehicleName" title="Nome do Veículo" required={false} />
              <input placeholder="Ex: Honda Civic 2023" {...register("vehicleName")} className="input-erp-primary input-erp-default"/>

              {/* <Input
                id="vehicleName"
                placeholder="Ex: Honda Civic 2023"
                {...register("vehicleName")}
                onChange={(e) => setValue("vehicleName", e.target.value)}
              /> */}
            </div>

            {/* Client Name */}
            <div>
              <Label htmlFor="clientName" title="Nome do Cliente" required={false} />
              <input placeholder="Ex: João Silva" {...register("clientName")} className="input-erp-primary input-erp-default"/>

              {/* <Input
                id="clientName"
                placeholder="Ex: João Silva"
                {...register("clientName")}
                onChange={(e) => setValue("clientName", e.target.value)}
              /> */}
            </div>

            {/* Vehicle Value */}
            <div>
              <Label htmlFor="vehicleValue" title="Valor do Veículo (R$)" />
              <Controller
                name="vehicleValue"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumericFormat
                    className="input-erp-primary input-erp-default" 
                    value={value}
                    onValueChange={(values) => onChange(values.floatValue ?? 0)}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}
                    placeholder="Ex: 85.000,00"
                  />
                )}
              />  
            </div>

            {/* Down Payment */}
            <div>
              <Label htmlFor="downPayment" title="Entrada (R$)" />
              <Controller
                name="downPayment"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <NumericFormat
                      className="input-erp-primary input-erp-default" 
                      value={value}
                      onValueChange={(values) => onChange(values.floatValue ?? 0)}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      fixedDecimalScale
                      allowNegative={false}
                      placeholder="Ex: 20.000,00"
                    />
                )}
              />  
            </div>

            {/* Monthly Interest Rate */}
            <div>
              <Label htmlFor="monthlyInterestRate" title="Taxa de Juros Mensal (%)" />
              <input placeholder="Ex: 1.5" {...register("monthlyInterestRate")} className="input-erp-primary input-erp-default"/>
              {/* <Input
                id="monthlyInterestRate"
                placeholder="Ex: 1.5"
                error={!!errors.monthlyInterestRate}
                hint={errors.monthlyInterestRate?.message}
                {...register("monthlyInterestRate", { required: "Campo obrigatório" })}
                onChange={(e) => setValue("monthlyInterestRate", e.target.value)}
              /> */}
            </div>

            {/* Installments */}
            <div>
              <Label htmlFor="installments" title="Número de Parcelas" />
              <div className="flex gap-2">
                {INSTALLMENT_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setValue("installments", n)}
                    className={`flex-1 h-11 rounded-lg border text-sm font-semibold transition-all
                      ${Number(watchedInstallments) === n
                        ? "bg-brand-500 text-white border-brand-500 shadow-md"
                        : "border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400 hover:border-brand-400 hover:text-brand-500"
                      }`}
                  >
                    {n}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 justify-end">
            <Button type="submit" size="sm" variant="primary">
              Calcular
            </Button>
            {result && (
              <Button type="button" size="sm" variant="outline-primary" onClick={handleSubmit(onSave)}>
                {isEditing ? "Atualizar" : "Salvar Simulação"}
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      {result && (
        <>
          <SimulationResultCard simulation={result} />
          {compareData.length > 0 && (
            <CompareInstallments
              options={compareData}
              bestInstallments={bestInstallments}
              currentInstallments={Number(watchedInstallments)}
              onSelect={(n) => setValue("installments", n)}
            />
          )}
          {result.amortizationTable && result.amortizationTable.length > 0 && (
            <>
              <AmortizationChart data={result.amortizationTable} />
              <AmortizationTable data={result.amortizationTable} />
            </>
          )}
        </>
      )}
    </div>
  );
}
