'use client'
import axios from "axios";
import { useState } from "react";


export default function Home() {

  const [dia, setDia] = useState('')
  const [horainicio, setHoraInicio] = useState('')
  const [horafinal, setHoraFinal] = useState('')

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    //console.log(" Teste de console", dia, horainicio, horafinal)
    const data = {
      Dia: dia,
      HoraInicio: horainicio,
      HoraFinal: horafinal
    }

    axios.post('https://api.sheetbest.com/sheets/d62ffb52-b143-4612-a599-ec42bada050e',
      data
    ).then((response) => {
      setDia('')
      setHoraInicio('')
      setHoraFinal('')
      console.log("Dados enviado", response)
    })
  }

  return (
    <>
      <div className="container">
        <h1>
          Tela de Registro de Pontos
        </h1>

        <form autoComplete="off" className="form-group" onSubmit={handleSubmit}>
          <label>Data</label>
          <input type="date" placeholder="Enter Nome" className="form-control" required 
            onChange={(e) => setDia(e.target.value)} value={dia}/>
          <br></br>

          <label>Primeira Hora</label>
          <input type="time" placeholder="Enter horainicio" className="form-control" required 
            onChange={(e) => setHoraInicio(e.target.value)} value={horainicio}/>
          <br></br>

          <label>Segunda Hora</label>
          <input type="time" placeholder="Enter horafinal" className="form-control" required 
            onChange={(e) => setHoraFinal(e.target.value)} value={horafinal}/>
          <br></br>

          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <button type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </>
  );
}
