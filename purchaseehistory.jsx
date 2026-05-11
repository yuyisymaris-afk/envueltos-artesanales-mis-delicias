import React, { useState, useEffect } from "react";

export default function App() {
  // Registro
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState("");

  // Login
  const [user, setUser] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [remember, setRemember] = useState(false);

  // Productos
  const [products, setProducts] = useState([
    { name: "Producto 1", stock: 5, limit: 3, agotado: false }
  ]);

  //Enviar SMS (simulado)
  const sendSMS = () => {
    const fakeCode = "1234";
    setSentCode(fakeCode);
    alert("Código enviado: " + fakeCode);
  };

  const verify = () => {
    if (code === sentCode) {
      alert("Registro exitoso");
    } else {
      alert("Código incorrecto");
    }
  };

  //Login
  const login = () => {
    if (blocked) return alert("Cuenta bloqueada");

    const success = false; // cambiar a true para probar acceso

    if (!success) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setBlocked(true);
        setTimeout(() => setBlocked(false), 10000);
      }
    } else {
      if (remember) localStorage.setItem("user", "ok");
      setUser("ok");
    }
  };

  //Alertas de stock
  useEffect(() => {
    products.forEach((p) => {
      if (p.stock <= p.limit) {
        alert("Stock bajo: " + p.name);
      }
    });
  }, [products]);

  const marcarAgotado = (index) => {
    const newProducts = [...products];
    newProducts[index].agotado = true;
    newProducts[index].fecha = "2026-06-01";
    setProducts(newProducts);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sistema</h1>

      {!user ? (
        <>
          {/*REGISTRO */}
          <h2>Registro</h2>
          <input
            placeholder="Celular"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendSMS}>Enviar SMS</button>

          <input
            placeholder="Código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={verify}>Verificar</button>

          {/*LOGIN*/}
          <h2>Login</h2>
          <button onClick={login}>Ingresar</button>

          <label>
            <input
              type="checkbox"
              onChange={(e) => setRemember(e.target.checked)}
            />
            Recordarme
          </label>

          {blocked && <p>Cuenta bloqueada temporalmente</p>}
        </>
      ) : (
        <>
          {/*PRODUCTOS*/}
          <h2>Productos</h2>
          {products.map((p, i) => (
            <div key={i}>
              <p>{p.name}</p>
              <p>Stock: {p.stock}</p>

              {p.agotado ? (
                <p>Agotado hasta: {p.fecha}</p>
              ) : (
                <button onClick={() => marcarAgotado(i)}>
                  Marcar agotado
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}