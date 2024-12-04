import React from "react";
import { useState } from 'react';

function App() {
  const [asientos, setAsientos] = useState([
    // { numero: 1, disponible: 0, reservadoPor: "Ariel" },
    // { numero: 2, disponible: 1, reservadoPor: null },
    // { numero: 3, disponible: 0, reservadoPor: "Juan" },
    // { numero: 4, disponible: 1, reservadoPor: null },
    // { numero: 5, disponible: 0, reservadoPor: "Fernando" }
  ]);

  React.useEffect(() => {
    getAsientos();
  }, []);

  const getAsientos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/asientos");
      const data = await response.json();
      setAsientos(data);
    } catch (error) {
      console.error(error);
    }
  }

  const reservarAsientoAPI = async (numero) => {
    try {
      const response = await fetch(`http://localhost:3000/api/asientos/reservar/${numero}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ reservadoPor: "Usuario" })
      });
      const data = await response.json();
      console.log(data);
      getAsientos();
    } catch (error) {
      console.error(error);
    }
  }

  const liberarAsientoAPI = async (numero) => {
    try {
      const response = await fetch(`http://localhost:3000/api/asientos/liberar/${numero}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log(data);
      getAsientos();
    } catch (error) {
      console.error(error);
    }
  }

  const crearAsientoAPI = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/asientos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log(data);
      getAsientos();
    } catch (error) {
      console.error(error);
    }
  }

  const eliminarAsientoAPI = async (numero) => {
    try {
      const response = await fetch(`http://localhost:3000/api/asientos/${numero}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log(data);
      getAsientos();
    } catch (error) {
      console.error(error);
    }
  }

  // Funcion reservar asientos
  const reservarAsiento = (numero) => {
    if (window.confirm(`¿Está seguro que desea reservar el asiento ${numero}?`)) {

      reservarAsientoAPI(numero);
      alert(`Asiento ${numero} reservado exitosamente.`);
    }
  };

  // Funcion para liberar asientos
  const liberarAsiento = (numero) => {
    if (window.confirm(`¿Está seguro que desea liberar el asiento ${numero}?`)) {
      liberarAsientoAPI(numero);
      alert(`Asiento ${numero} liberado exitosamente.`);
    }
  };

  return (
    <div className="container mt-4 w-100">
      <div className="d-flex justify-content-center align-items-center">
        <h1 className="text-center mb-4">Reserva de Asientos</h1>

        <button className="btn btn-primary m-3" type="button" onClick={() => crearAsientoAPI()}>
          +
        </button>

      </div>

      <div className="row">
        {
          asientos.map(
            (asiento) => (
              <div key={asiento.numero} className="col-md-3 col-sm-6 mb-3 position-relative">
                <button className="btn btn-danger position-absolute top-0 end-6 m-2"
                  type="button"
                  onClick={() => {
                    eliminarAsientoAPI(asiento.numero)
                  }}
                >
                  <i className="bi bi-trash3-fill"></i>
                </button>
                <button
                  className={`btn btn-block ${asiento.disponible ? "btn-success" : "btn-danger"}`}
                  onClick={() => {
                    asiento.disponible ? reservarAsiento(asiento.numero) : liberarAsiento(asiento.numero)
                  }}
                  style={{ width: "250px", height: "260px" }}
                >
                  <img
                    src={asiento.disponible ? "images/silla-recortada.webp" : "images/silla-recortada.webp"}
                    alt="icon"
                    style={{ width: "200px", height: "230px", margin: "0px" }}
                  />
                  {asiento.disponible ? `Asiento ${asiento.numero}` : `Asiento ${asiento.numero} Reservado por ${asiento.reservadoPor}`}
                </button>

              </div>
            )
          )
        }
      </div>
    </div>
  );
}

export default App;