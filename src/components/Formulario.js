import React, { useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        id: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [ error, actualizarError ] = useState(false)

    // Funcion que se ejecuta cada vez que el usuario escribe en un input
    const handleChange = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    };


    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas } = cita;

    //Al enviar el Formulario
    const submitCita = e =>{
        e.preventDefault();

        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        //Eliminar el mensaje previo
        actualizarCita(false)
        //Asignar un ID
        cita.id = uuid();
        
        //Crear la Cita
        crearCita(cita)
        //Reiniciar el Form
        actualizarCita({
            mascota: '',
            propietario: '',
            id: '',
            fecha: '',
            hora: '',
            sintomas: ''  
        })
    }

    return ( 
        <>
        <h2>Crear Cita</h2>
        {error ? <p className="alerta-error">TODOS LOS CAMPOS SON OBLIGATORIOS</p>  : null}
        <form
            onSubmit={submitCita}
        >
            <label htmlFor="mascota">Nombre Mascota</label>
                    <input
                        type="text"
                        name="mascota"
                        className="u-full-width"
                        placeholder="Nombre Mascota"
                        onChange={handleChange}
                        value={mascota}
                    />
            <label htmlFor="propietario">Nombre del Dueño</label>
                    <input
                        type="text"
                        name="propietario"
                        className="u-full-width"
                        placeholder="Nombre del Dueño de la mascota"
                        onChange={handleChange}
                        value={propietario}
                    />
            <label htmlFor="fecha">Fecha</label>
                    <input
                        type="date"
                        name="fecha"
                        className="u-full-width"
                        onChange={handleChange}
                        value={fecha}
                    />
            <label htmlFor="hora">Hora</label>
                    <input
                        type="time"
                        name="hora"
                        className="u-full-width"
                        onChange={handleChange}
                        value={hora}
                    />
            <label htmlFor="dueño">Sintomas</label>
                    <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                    ></textarea>   
            <button
            type="submit"
            className="u-full-width button-primary"
            >Agregar Cita</button>
        </form>

        </>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;