import { ResetSimulation, TSimulation } from "@/types/simulator/simulation.type";
import { atom } from "jotai";

export const simulationAtom = atom<TSimulation>(ResetSimulation);
export const simulationResultAtom = atom<TSimulation | null>(null);
