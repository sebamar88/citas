import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ArregloCitas from './components/ArregloCitas';

function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas')) ;
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState([]);

  //Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales]);

  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ]);
  };

  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id );
    guardarCitas(nuevasCitas);
  }

  const titulo = citas.length >= 1 ? 'Administra tus citas' : 'Agrega Nuevas Citas';

  return (
      <>
        <h1>Administrador de Pacientes</h1>

        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita =>(                
                <ArregloCitas
                  cita={cita}
                  key={cita.id}
                  eliminarCita = {eliminarCita}
                />
                ))}
            </div>
          </div>
        </div>
      </>
  );
}

export default App;
