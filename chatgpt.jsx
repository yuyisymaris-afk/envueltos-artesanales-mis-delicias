import React, { useState } from "react";

export default function App() {
  const [telefono, setTelefono] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigo, setCodigo] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviarCodigo = () => {
    console.log("SMS enviado a:", telefono);
    setEnviado(true);
  };

  const verificarCodigo = () => {
    console.log("Código verificado:", codigo);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Registro</h2>
      <input
        type="text"
        placeholder="Número de celular"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={enviarCodigo} className="bg-blue-500 text-white p-2 w-full">
        Enviar código SMS
      </button>

      {enviado && (
        <>
          <input
            type="text"
            placeholder="Código SMS"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="border p-2 w-full mt-2"
          />
          <button onClick={verificarCodigo} className="bg-green-500 text-white p-2 w-full mt-2">
            Verificar
          </button>
        </>
      )}
    </div>
  );
}

// 2. Login con bloqueo tras 3 intentos
export function Login() {
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  const manejarLogin = () => {
    if (bloqueado) return;

    const correcto = false; // Simulación

    if (!correcto) {
      const nuevosIntentos = intentos + 1;
      setIntentos(nuevosIntentos);

      if (nuevosIntentos >= 3) {
        setBloqueado(true);
        setTimeout(() => {
          setIntentos(0);
          setBloqueado(false);
        }, 10000);
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Login</h2>
}