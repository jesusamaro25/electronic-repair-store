import { Component, OnInit } from '@angular/core';

export interface Section {
  cliente: string;
  nombre: string;
  fecha: Date;
  hora: string;
  cols: number;
  rows: number;
  descripcion: string;
  modeloequipo: string;
  color: string;
}

@Component({
  selector: 'app-registrar-incidencia',
  templateUrl: './registrar-incidencia.component.html',
  styleUrls: ['./registrar-incidencia.component.css']
})
export class RegistrarIncidenciaComponent implements OnInit {

  tareas: Section[] = [
    {
      cliente: 'Luis',
      nombre: 'Tarea 1',
      fecha: new Date('6/23/16'),
      hora: '22:04',
      cols: 1,
      rows: 3,
      descripcion: 'Reparacion de un pin de carga de una tablet',
      modeloequipo: 'modeloequipo1',
      color: '#18aca0'
    },
    {
      cliente: 'Adrian',
      nombre: 'Tarea 2',
      fecha: new Date('6/23/16'),
      hora: '22:04',
      cols: 1,
      rows: 3,
      descripcion: 'Reparacion de un pin de carga de una telefono marca samsung',
      modeloequipo: 'modeloequipo2',
      color: '#1891ac'
    },
    {
      cliente: 'Donai',
      nombre: 'Tarea 3',
      fecha: new Date('6/23/16'),
      hora: '22:04',
      cols: 1,
      rows: 3,
      descripcion: 'Reparacion de un pin de carga de una computadora xd',
      modeloequipo: 'modeloequipo3',
      color: '#18aca0'
    }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
