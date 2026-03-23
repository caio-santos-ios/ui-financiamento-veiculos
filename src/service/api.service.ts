import axios from "axios";

export const uriBase = "http://localhost:5170";
export const baseURL = `${uriBase}/api`;

export const api = axios.create({
  baseURL,
});
