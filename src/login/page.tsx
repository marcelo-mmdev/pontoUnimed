"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";


const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const router = useRouter();

   const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "anaceless@gmail.com" && senha === "Murilo2024") {
      router.push("/dashboard");
    } else {
      setErro("E-mail ou senha inválidos");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen grid bg-orange-300/20">
        <div className="m-auto">
          <h1 className="w-full font-bold text-4xl mb-5 text-center uppercase">
            Pontos 👋
          </h1>
          <form
            onSubmit={handleLogin}
            className="border p-16 bg-white/30 rounded-lg shadow-md"
          >
            <h1 className="text-center font-semibold text-3xl mb-5">Sistema</h1>
            
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
                className="text-black border border-black/20 rounded-lg p-1 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <input
                type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
                className="text-black border border-black/20 rounded-lg p-1 shadow-sm"
              />
            </div>

            {erro && <p className="text-red-500 text-sm">{erro}</p>}
          <button
            type="submit"
              className="w-full flex justify-center items-center cursor-pointer gap-2 bg-green-300/50 rounded-md p-1 hover:shadow-md mt-5 font-bold text-lg"
          >
            Entrar
          </button>
          
            
            <div className="mt-5">
              <span className="cursor-default">
                Sistema de Pontos para Veinha
              </span>
             
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

