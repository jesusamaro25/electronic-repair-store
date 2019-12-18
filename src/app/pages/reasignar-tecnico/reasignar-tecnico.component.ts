import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../assets/funciones';
import { ModalDetallesTecnicoComponent } from './modal-detalles-tecnico/modal-detalles-tecnico.component';
import { ModalReasignarTecnicoComponent } from './modal-reasignar-tecnico/modal-reasignar-tecnico.component';


export interface TablaData {

  id: number;
  cliente_nombre: string;
  tecnico_responsable: string;
  marca_nombre: string;
  modelo_nombre: string;
  costo_revision: number;
  costo_servicio: number;

  problema: string,
  servicio_nombre: number;
  promocion_nombre: string;
  resultado: string;

}

let servicio: any[] = [];

@Component({
  selector: 'app-reasignar-tecnico',
  templateUrl: './reasignar-tecnico.component.html',
  styleUrls: ['./reasignar-tecnico.component.css']
})
export class ReasignarTecnicoComponent implements OnInit {

  constructor(public dialog: MatDialog,public alert: funciones) { this.CargarTabla(); }

  ngOnInit() {this.dataSource.paginator=this.paginator;
  }
 
 @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Servicio','Cliente','Tecnico','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

CargarTabla(){

    servicio=[
      {
        id: '1',
        cliente_nombre: 'Yaimar Rodriguez',
        tecnico_responsable: 'Donai Torin',
        marca_nombre:'Sony',
        modelo_nombre: 'PS4',
        problema:'la consola  prende desde hace 3 semanas',
        diagnostico:'daño de la fuente de poder',
        servicio_nombre: 'Reparacion de consolas',
        promocion_nombre: 'Descuento especial en consolas',
        descuento: 20,
        costo_revision: 10000,
        costo_servicio: 20000,

        resultado: 'Reparado',
      },
      {
        id: '2',
        cliente_nombre: 'Diego Pichardo',
        tecnico_responsable: 'Carlos Rodriguez',

        marca_nombre:'Samsung',
        modelo_nombre: 'S4',

        problema:'el tactil no me sirve',
        diagnostico:'averia de pantalla completa por caida',
        servicio_nombre: 'Reparacion de celulares',
        promocion_nombre: '',
        descuento: 0,
        costo_revision: 30000,
        costo_servicio: 40000,

        resultado: 'Reparado',
      }

    ]

    this.dataSource = new MatTableDataSource(servicio);
    this.dataSource.paginator = this.paginator;
    }

    showDetalles(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalDetallesTecnicoComponent, dialogConfig);
    
  }

    showReasignar(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height='60%'
    dialogConfig.data=datos;

     const dialogRef = this.dialog.open(ModalReasignarTecnicoComponent, dialogConfig);
    
  }

}

