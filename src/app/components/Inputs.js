import styles from "./styles/input.css";
import Select from 'react-select';
import { useState } from 'react';

const options = [
  { value: 'p', label: 'Punto Inicial' },
  { value: 'tp', label: 'Traslacion' },
  { value: 'rx', label: 'Rotación en eje OX' },
  { value: 'ry', label: 'Rotación en eje OY' },
  { value: 'rz', label: 'Rotación en eje OZ' },
]


function Transformaciones2DForm({ funcionOperador }) {
    const [angulo1, setAngulo1] = useState(0);
    const [angulo2, setAngulo2] = useState(0);
    const [angulo3, setAngulo3] = useState(0);
    const [traslacion1, setTraslacion1] = useState(0);
    const [traslacion2, setTraslacion2] = useState(0);
    const [traslacion3, setTraslacion3] = useState(0);
    const [inicial1, setInicial1] = useState(0);
    const [inicial2, setInicial2] = useState(0);
    const [inicial3, setInicial3] = useState(0);
    const [operaciones, setOperaciones] = useState([]);
  
    const handleSubmit = (e) => {
        e.preventDefault();
      
        // Convertir los valores a números
        const angulo1Num = parseFloat(angulo1);
        const angulo2Num = parseFloat(angulo2);
        const angulo3Num = parseFloat(angulo3);
      
        const traslacion1Num = parseFloat(traslacion1);
        const traslacion2Num = parseFloat(traslacion2);
        const traslacion3Num = parseFloat(traslacion3);

        const inicial1Num = parseFloat(inicial1);
        const inicial2Num = parseFloat(inicial2);
        const inicial3Num = parseFloat(inicial3);
      
        // Validar que los valores sean números
        const angulosValidos = !isNaN(angulo1Num) && !isNaN(angulo2Num) && !isNaN(angulo3Num);
        const traslacionesValidas = !isNaN(traslacion1Num) && !isNaN(traslacion2Num) && !isNaN(traslacion3Num);
        const inicialesValidas = !isNaN(inicial1Num) && !isNaN(inicial2Num) && !isNaN(inicial3Num);
      
        // Validar que los ángulos estén entre 0 y 360
        const angulosEnRango = angulo1Num >= 0 && angulo1Num <= 360 && 
                              angulo2Num >= 0 && angulo2Num <= 360 && 
                              angulo3Num >= 0 && angulo3Num <= 360;
      
        if (angulosValidos && traslacionesValidas && angulosEnRango && inicialesValidas) {
          // Enviar los datos al componente padre
          const angulos = [angulo1Num, angulo2Num, angulo3Num];
          const traslaciones = [traslacion1Num, traslacion2Num, traslacion3Num];
          const puntoInicial = [inicial1Num, inicial2Num, inicial3Num];

          // Llamar a una función del componente padre pasando los arrays de angulos y traslaciones
          // reemplaza "nombreFuncionPadre" por el nombre de la función en el componente padre que recibiría los arrays
          funcionOperador(angulos, traslaciones, puntoInicial, operaciones, operaciones);
        } else {
          // Mostrar un mensaje de error si los valores no son válidos
          alert('Por favor, ingresa valores numéricos válidos y asegúrate de que los ángulos estén entre 0 y 360.');
        }
      };
  
    return (
      <div>
        <h1>Ingresar valores:</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-row">
            <label htmlFor="inicial1">Punto Inicial X:</label>
            <input
              type="number"
              id="inicial1"
              name="inicial1"
              step="any"
              value={inicial1}
              onChange={(e) => setInicial1(e.target.value)}
              required
            />
          </div>
  
          <div className="form-row">
            <label htmlFor="inicial2">Punto Inicial Y:</label>
            <input
              type="number"
              id="inicial2"
              name="inicial2"
              step="any"
              value={inicial2}
              onChange={(e) => setInicial2(e.target.value)}
              required
            />
          </div>
  
          <div className="form-row">
            <label htmlFor="inicial3">Punto Inicial Z:</label>
            <input
              type="number"
              id="inicial3"
              name="inicial3"
              step="any"
              value={inicial3}
              onChange={(e) => setInicial3(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-row">
            <label htmlFor="angulo1">Ángulo 1:</label>
            <input
              type="number"
              id="angulo1"
              name="angulo1"
              min="0"
              max="360"
              step="any"
              value={angulo1}
              onChange={(e) => setAngulo1(e.target.value)}
              required
            />
          </div>
  
          <div className="form-row">
            <label htmlFor="angulo2">Ángulo 2:</label>
            <input
              type="number"
              id="angulo2"
              name="angulo2"
              min="0"
              max="360"
              step="any"
              value={angulo2}
              onChange={(e) => setAngulo2(e.target.value)}
              required
            />
          </div>
  
          <div className="form-row">
            <label htmlFor="angulo3">Ángulo 3:</label>
            <input
              type="number"
              id="angulo3"
              name="angulo3"
              min="0"
              max="360"
              step="any"
              value={angulo3}
              onChange={(e) => setAngulo3(e.target.value)}
              required
            />
          </div>
          <br/>
  
          <div className="form-row">
            <label htmlFor="traslacion1">Traslación X:</label>
            <input
              type="number"
              id="traslacion1"
              name="traslacion1"
              step="any"
              value={traslacion1}
              onChange={(e) => setTraslacion1(e.target.value)}
              required
            />
          </div>
  
          <div className="form-row">
            <label htmlFor="traslacion2">Traslación Y:</label>
            <input
              type="number"
              id="traslacion2"
              name="traslacion2"
              step="any"
              value={traslacion2}
              onChange={(e) => setTraslacion2(e.target.value)}
              required
            />
          </div>
  
          <div className="form-row">
            <label htmlFor="traslacion3">Traslación Z:</label>
            <input
              type="number"
              id="traslacion3"
              name="traslacion3"
              step="any"
              value={traslacion3}
              onChange={(e) => setTraslacion3(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-row">
            <label htmlFor="operaciones">Operaciones:</label>
            <Select
              value={ operaciones }
              onChange={ setOperaciones }
              isMulti
              id="operaciones"
              name="operaciones"
              options={ options }
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <br />
          <div className="form-row">
            <label htmlFor="resultado">Resultado:</label>
            <Select
              value={ result }
              onChange={ setResult }
              isMulti
              id="resultado"
              name="resultado"
              options={ options }
              className="basic-multi-select"
              classNamePrefix="select"
            />

          </div>  
          <br />
          <div className="form-row">
            <input type="submit" value="Calcular" />
          </div>
        </form>
      </div>
    );
  }

  export default Transformaciones2DForm;