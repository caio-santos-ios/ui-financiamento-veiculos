import { toast } from "react-toastify";

export const configApi = (contentTypeJson: boolean = true) => {
  return {
    headers: {
      "Content-Type": contentTypeJson ? "application/json" : "multipart/form-data",
    },
  };
};

export const resolveResponse = (response: any) => {
  if (response?.status >= 200 && response?.status < 300) {
    toast.success(response.message ?? "Operação realizada com sucesso!", { theme: "colored" });
    return;
  }

  if (response?.["code"] === "ERR_NETWORK") {
    toast.error("Erro de conexão. Verifique se a API está rodando.", { theme: "colored" });
    return;
  }

  if (response?.status >= 400 && response?.status < 500) {
    const msg = response?.response?.data?.message ?? "Requisição inválida.";
    toast.warn(msg, { theme: "colored" });
    return;
  }

  if (response?.status >= 500) {
    toast.error("Erro interno no servidor. Tente novamente mais tarde.", { theme: "colored" });
    return;
  }

  const msg = response?.response?.data?.message ?? response?.message ?? "Ocorreu um erro inesperado.";
  toast.error(msg, { theme: "colored" });
};
