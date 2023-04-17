import { useState, useEffect } from "react";
import { api } from "../api";

type GetAPIProps = {
  cep: string;
};

type DataTypes = {
  localidade: string;
  uf: string;
  logradouro: string;
  bairro: string;
};

export default function getAPI({ cep }: GetAPIProps) {
  const [data, setData] = useState<DataTypes>();

  async function fetchAPI() {
    try {
      const res = await api.get(`${!cep ? "01001000" : cep}/json`);
      const data = await res.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, [cep]);

  return { data };
}
