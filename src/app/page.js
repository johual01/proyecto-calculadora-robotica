import styles from "./page.module.css";
import Input from './components/Inputs';
import { matrix, multiply } from 'mathjs';
import { useState } from 'react';

function Home() {
  const [matriz, setMatriz] = useState(null);
  const manejarDatosFormulario = (angulos, traslaciones, puntoInicial, operaciones) => {
    // Aquí puedes hacer lo que necesites con los arrays de angulos y traslaciones
    let obj = {}
    for (let i = 0; i < angulos.length; i++) {
      const angulo = angulos[i];
      const anguloEnRadianes = angulo * (Math.PI / 180);
      if (angulo > 0 && angulo < 360) {
        if (i == 0) {
          // Es rotacion en eje ox
          obj.rx = matrix(
            [
              [1, 0, 0, 0],
              [0, Math.cos(anguloEnRadianes), -Math.sin(anguloEnRadianes), 0],
              [0, Math.sin(anguloEnRadianes), Math.cos(anguloEnRadianes), 0],
              [0, 0, 0, 1]
            ]
          )
        }
        if (i == 1) {
          // Es rotacion en eje oy
          obj.ry = matrix(
            [
              [Math.cos(anguloEnRadianes), 0, Math.sin(anguloEnRadianes)],
              [0, 1, 0],
              [-Math.sin(anguloEnRadianes), 0, Math.cos(anguloEnRadianes)],
              [0, 0, 0, 1]
            ]
          )
        }
        if (i == 2) {
          // Es rotacion en eje oz
          obj.rz = matrix(
            [
              [Math.cos(anguloEnRadianes), -Math.sin(anguloEnRadianes), 0, 0],
              [Math.sin(anguloEnRadianes), Math.cos(anguloEnRadianes), 0, 0]
              [0, 0, 1, 0],
              [0, 0, 0, 1]
            ]
          )
        }
      }
    }
    if ((traslaciones[0] > 0 || traslaciones[1] > 0 || traslaciones[2] > 0) && puntoInicial.length == 3) {
      obj.tp = matrix([
        [1, 0, 0, traslaciones[0]],
        [0, 1, 0, traslaciones[1]],
        [0, 0, 1, traslaciones[2]],
        [0, 0, 0, 1]
      ])
      obj.p = matrix([
        [puntoInicial[0]],
        [puntoInicial[1]],
        [puntoInicial[2]],
        [1]
      ])
    }
    let matriz;
    for (let i = 0; i < operaciones.length; i++) {
      const operacion = operaciones[i];
      if (i == 0) {
        matriz = obj[operacion]
      } else {
        matriz = multiply(matriz, obj[operacion])
      }
    }
    return setMatriz(matriz);
  };
  return (
    <main className={styles.main}>
      <div>
        <Input funcionOperador={manejarDatosFormulario}></Input>
        { matriz ? <table>
          {matriz.map((fila, indexFila) => (
            <tr key={indexFila}>
              {fila.map((elemento, indexColumna) => (
                <td key={indexColumna}>{elemento}</td>
              ))}
            </tr>
          ))}
        </table> : <br/>}
      </div>
    </main>
  );
}

export default Home
