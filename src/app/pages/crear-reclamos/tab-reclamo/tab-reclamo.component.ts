import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { ModalDetalleReclamoComponent } from './modal-detalle-reclamo/modal-detalle-reclamo.component';

export interface TablaData {

  id: number;

  marca_nombre: string;
  modelo_nombre: string;
  problema: string,
  servicio_nombre: number;
  desc: string;

  estatus: string;

}

let servicio: any[] = [];

@Component({
  selector: 'app-tab-reclamo',
  templateUrl: './tab-reclamo.component.html',
  styleUrls: ['./tab-reclamo.component.css']
})
export class TabReclamoComponent implements OnInit {

  @ViewChild(MatPaginator ) paginator: MatPaginator;

  displayedColumns: string[] = ['equipo','descripcion','estado','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  constructor(public dialog: MatDialog) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource.paginator=this.paginator;
  }

  CargarTabla(){

    servicio=[
      {
        id: '1',

        marca_nombre:'Sony',
        modelo_nombre: 'PS4',
        problema:'la consola  prende desde hace 3 semanas',
        servicio_nombre: 'Reparacion de consolas',
        tipo:'Persistencia del problema original',
        desc: 'a las 2 semanas el problema regreso',

        estatus: 'e',
      },
      {
        id: '2',

        marca_nombre:'Samsung',
        modelo_nombre: 'S5',
        problema:'no me carga el telefono',
        servicio_nombre: 'Reparacion de celular',
        tipo:'Aparicion de un nuevo problema',
        desc: 'despues de la reparacion ahora no agarra señal',

        estatus: 'a',
      },
      {
        id: '1',

        marca_nombre:'Samsung',
        modelo_nombre: 'S6',
        problema:'el telefono se recaliente',
        servicio_nombre: 'Reparacion de celular',
        tipo:'Persistencia del problema original',
        desc: 'se empezo a recalentar de nuevo',

        estatus: 'r',
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

    const dialogRef = this.dialog.open(ModalDetalleReclamoComponent, dialogConfig);
    
  }

}
