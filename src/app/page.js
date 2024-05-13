"use client";

import styles from "./page.module.css";
import Input from './components/Inputs';
import { matrix, multiply } from 'mathjs';
import { useState } from 'react';

function Home() {
  const [matriz, setMatriz] = useState(null);
  const calcularTabla = (matrix) => {
    const rows = [];
    let cells = [];
    let previousIndex = null;
    matrix.forEach((value, index, matrix) => {
      if (!previousIndex) {
        cells.push(<td key={index[0] + '-' + index[1]}>{value}</td>);
      } else {
        if (previousIndex[0] != index[0]) {
          if (rows.length == 0) {
            rows.push(<tr key={index[0]}><td>{'┌ '}</td>{cells}<td>{' ┐'}</td></tr>);
          } else {
            rows.push(<tr key={index[0]}><td>{'| '}</td>{cells}<td>{'  |'}</td></tr>);
          }
          cells = [<td key={index[0] + '-' + index[1]}>{value}</td>];
        } else {
          cells.push(<td key={index[0] + '-' + index[1]}>{value}</td>);
        }
      }
      previousIndex = index;
    })
    rows.push(<tr key={rows.length}><td>{' └'}</td>{cells}<td>{' ┘'}</td></tr>)
    return rows;
  }
  const manejarDatosFormulario = (angulos, traslaciones, puntoInicial, operaciones) => {
    // Aquí puedes hacer lo que necesites con los arrays de angulos y traslaciones
    let obj = {}
    for (let i = 0; i <= angulos.length; i++) {
      const angulo = angulos[i];
      const anguloEnRadianes = angulo * (Math.PI / 180);
      if (angulo > -360 && angulo < 360) {
        console.log('1')
        if (i == 0) {
          // Es rotacion en eje ox
          obj.rx = matrix(
            [
              [1, 0, 0, 0],
              [0, Math.round(Math.cos(anguloEnRadianes)), Math.round(-Math.sin(anguloEnRadianes)), 0],
              [0, Math.round(Math.sin(anguloEnRadianes)), Math.round(Math.cos(anguloEnRadianes)), 0],
              [0, 0, 0, 1]
            ]
          )
        }
        console.log('2')
        if (i == 1) {
          // Es rotacion en eje oy
          obj.ry = matrix(
            [
              [Math.round(Math.cos(anguloEnRadianes)), 0, Math.round(Math.sin(anguloEnRadianes)), 0],
              [0, 1, 0, 0],
              [Math.round(-Math.sin(anguloEnRadianes)), 0, Math.round(Math.cos(anguloEnRadianes)), 0],
              [0, 0, 0, 1]
            ]
          )
        }
        console.log('3')
        if (i == 2) {
          // Es rotacion en eje oz
          obj.rz = matrix(
            [
              [Math.round(Math.cos(anguloEnRadianes)), Math.round(-Math.sin(anguloEnRadianes)), 0, 0],
              [Math.round(Math.sin(anguloEnRadianes)), Math.round(Math.cos(anguloEnRadianes)), 0, 0],
              [0, 0, 1, 0],
              [0, 0, 0, 1]
            ]
          )
        }
      }
    }
    if ((traslaciones[0] > 0 || traslaciones[1] > 0 || traslaciones[2] > 0) && puntoInicial.length == 3) {
      console.log('4')
      obj.tp = matrix([
        [1, 0, 0, traslaciones[0]],
        [0, 1, 0, traslaciones[1]],
        [0, 0, 1, traslaciones[2]],
        [0, 0, 0, 1]
      ])
      console.log('5')
      obj.p = matrix([
        [puntoInicial[0]],
        [puntoInicial[1]],
        [puntoInicial[2]],
        [1]
      ])
      console.log('6')
    }
    let matriz;
    for (let i = 0; i < operaciones.length; i++) {
      const { value } = operaciones[i];
      console.log(value)
      console.log(obj)
      if (i == 0) {
        matriz = obj[value]
      } else {
        matriz = multiply(matriz, obj[value])
      }
      console.log(matriz);
    }
    return setMatriz(matriz);
  };
  return (
    <main className={styles.main}>
      <div>
        <Input funcionOperador={manejarDatosFormulario}></Input>
        { 
          matriz 
          ? 
          <table>
            <tbody>
              {calcularTabla(matriz)}
            </tbody>
          </table> 
          : 
          <br/>
        }
      </div>
      <p>
        {'https://stackoverflow.com/questions/44630265/how-can-i-set-z-up-coordinate-system-in-three-js'}
      </p>
    </main>
  );
}

export default Home
