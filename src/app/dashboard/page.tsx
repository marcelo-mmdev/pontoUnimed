'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type Registro = {
  data: string;
  entrada: string;
  saida: string;
  horasTrabalhadas: number;
};

const registros: Registro[] = [
    { data: "31/07/2025", entrada: "08:43", saida: "18:06", horasTrabalhadas: 6.23 },
    { data: "01/08/2025", entrada: "07:52", saida: "17:04", horasTrabalhadas: 8.12 },
];

export default function Dashboard() {
  const [totalHoras, setTotalHoras] = useState(0);
  const [horasExtras, setHorasExtras] = useState(0);
  const cargaHoraria = 8;
    const router = useRouter();
  

  useEffect(() => {
    const total = registros.reduce((acc, r) => acc + r.horasTrabalhadas, 0);
    const extras = registros.reduce(
      (acc, r) => acc + Math.max(0, r.horasTrabalhadas - cargaHoraria),
      0
    );
    setTotalHoras(total);
    setHorasExtras(extras);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Banco de Horas</h1>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <Resumo titulo="Total Trabalhado" valor={`${totalHoras.toFixed(2)}h`} cor="red" />
          <Resumo titulo="Horas Extras" valor={`${horasExtras.toFixed(2)}h`} cor="gray" />
          <Resumo
            titulo="Saldo"
            valor={`${(totalHoras - registros.length * cargaHoraria).toFixed(2)}h`}
            cor="blue"
          />
          
          <button
            type="submit"
            onClick={() => router.push("/home")}
            className="w-full flex justify-center items-center rounded-lg cursor-pointer gap-2 bg-green-300/50  p-1 hover:shadow-md font-bold text-lg"
          >
            + Novo Ponto
          </button>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm text-gray-700 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <Th>Data</Th>
                <Th>Entrada</Th>
                <Th>Saída</Th>
                <Th>Horas Trabalhadas</Th>
                <Th>Extras</Th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r, idx) => {
                const extra = Math.max(0, r.horasTrabalhadas - cargaHoraria);
                return (
                  <tr key={idx} className="hover:bg-gray-50 border-b">
                    <Td>{r.data}</Td>
                    <Td>{r.entrada}</Td>
                    <Td>{r.saida}</Td>
                    <Td>{r.horasTrabalhadas.toFixed(2)}h</Td>
                    <Td>
                      {extra > 0 ? `+${extra.toFixed(2)}h` : "—"}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares

const Resumo = ({
  titulo,
  valor,
  cor,
}: {
  titulo: string;
  valor: string;
  cor: "blue" | "green" | "yellow" | "red" | "gray";
}) => {
  const cores: Record<typeof cor, string> = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <div className={`rounded-lg p-4 ${cores[cor]}`}>
      <p className="text-sm">{titulo}</p>
      <p className="text-xl font-bold">{valor}</p>
    </div>
  );
};

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-3 text-left font-semibold text-gray-600">{children}</th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="px-4 py-2 whitespace-nowrap">{children}</td>
);
