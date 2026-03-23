import axios from "axios";

export const uriBase = "https://api-financiamento-veiculos-production.up.railway.app";
export const baseURL = `${uriBase}/api`;

export const api = axios.create({
  baseURL,
});
