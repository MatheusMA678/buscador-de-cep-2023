import React, { useState } from "react";
import getAPI from "./hooks/getAPI";
import { motion } from "framer-motion";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [cep, setCep] = useState("");
  const { data } = getAPI({
    cep: cep,
  });

  const formattedCep = inputValue
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");

  const randomImage = `https://source.unsplash.com/random/?${data?.localidade.toLowerCase()}`;

  return (
    <div className="font-inter min-h-screen">
      <form
        className="flex items-stretch gap-4 p-4 fixed left-1/2 -translate-x-1/2 top-4 z-10"
        onSubmit={(e) => {
          e.preventDefault();
          setCep(formattedCep);
          // setInputValue("");
          console.log(data);
        }}
      >
        <input
          className="ring-1 ring-blue-500 focus:ring-2 focus:ring-blue-600 transition rounded-lg px-4 outline-none"
          value={formattedCep}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Digite um CEP"
        />
        <button className="w-32 h-12 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition shadow-lg">
          Buscar
        </button>
      </form>
      <main className="p-4 pt-32 relative overflow-hidden">
        <img
          src={randomImage}
          alt={`Imagem de ${data?.localidade}`}
          className="absolute blur-md w-full scale-110 h-[350px] top-0 left-0 -z-10"
        />
        <div className="">
          <motion.h1
            initial={{
              x: -100,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                type: "spring",
                duration: 1,
                delay: 1,
              },
            }}
            className="font-bold text-4xl"
          >
            {data?.localidade}, {data?.uf}
          </motion.h1>
          <p className="text-sm">{data?.logradouro}</p>
          <p className="text-sm">{data?.bairro}</p>
        </div>
      </main>
    </div>
  );
}
