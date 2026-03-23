export type TAmortizationRow = {
  month: number;
  installment: number;
  principal: number;
  interest: number;
  balance: number;
};

export type TSimulation = {
  id: string;
  vehicleValue: number;
  downPayment: number;
  monthlyInterestRate: number;
  installments: number;
  financedAmount: number;
  installmentValue: number;
  totalPaid: number;
  totalInterest: number;
  vehicleName: string;
  clientName: string;
  amortizationTable: TAmortizationRow[];
  createdAt: string;
};

export const ResetSimulation: TSimulation = {
  id: "",
  vehicleValue: 0,
  downPayment: 0,
  monthlyInterestRate: 1.5,
  installments: 48,
  financedAmount: 0,
  installmentValue: 0,
  totalPaid: 0,
  totalInterest: 0,
  vehicleName: "",
  clientName: "",
  amortizationTable: [],
  createdAt: "",
};

export type TSimulationForm = {
  vehicleValue: string;
  downPayment: string;
  monthlyInterestRate: string;
  installments: number;
  vehicleName: string;
  clientName: string;
};

export const ResetSimulationForm: TSimulationForm = {
  vehicleValue: "",
  downPayment: "",
  monthlyInterestRate: "1.5",
  installments: 48,
  vehicleName: "",
  clientName: "",
};

export type TInstallmentOption = {
  installments: number;
  installmentValue: number;
  totalPaid: number;
  totalInterest: number;
  isBest: boolean;
};

export type TCompareInstallments = {
  options: TInstallmentOption[];
  bestInstallments: number;
};
