import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../assets/funciones';
import { ModalDetalleCalificacionComponent } from './modal-detalle-calificacion/modal-detalle-calificacion.component';
import { ModalCalificacionComponent } from './modal-calificacion/modal-calificacion.component';


export interface TablaData {

  id: number;
  cliente_nombre:string;
  marca_nombre: string;
  modelo_nombre: string;
  fecha_entrega: Date;
  problema: string,
  servicio_nombre: number;
}
let servicio: any[] = [];
 
@Component({
  selector: 'app-ver-calificacion',
  templateUrl: './ver-calificacion.component.html',
  styleUrls: ['./ver-calificacion.component.css']
})
export class VerCalificacionComponent implements OnInit {

  constructor(public dialog: MatDialog,public alert: funciones) { 
    this.CargarTabla();
    
  }

  ngOnInit() {
    this.dataSource.paginator=this.paginator;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['cliente','equipo','servicio','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  dato: TablaData;

  CargarTabla(){

    servicio=[
      {
        id: '1',
        cliente_nombre:'Luis Ramos',
        marca_nombre:'Sony',
        modelo_nombre: 'PS4',
        fecha_entrega:'03/09/2019',
        problema:'la consola  prende desde hace 3 semanas',
        diagnostico:'daño de la fuente de poder',
        servicio_nombre: 'Reparacion de consolas',
        resultado: 'Reparado',
      
      },
      {
        id: '2',
        cliente_nombre:'juan  Perez',
        marca_nombre:'Samsung',
        modelo_nombre: 'S4',
        fecha_entrega:'03/09/2019',
        problema:'el tactil no me sirve',
        diagnostico:'averia de pantalla completa por caida',
        servicio_nombre: 'Reparacion de celulares',
        resultado: 'Reparado',
      },
      {
        id: '3',
        cliente_nombre:'  madelein tovar',
        marca_nombre:'Samsung',
        modelo_nombre: 'S5',
        fecha_entrega:'03/09/2019',
        problema:'el tactil no me sirve',
        diagnostico:'averia de tactil de la pantalla, resulta irreparable en el modelo del telefono',
        servicio_nombre: 'Reparacion de celulares',
        resultado: 'No Reparado',
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

    const dialogRef = this.dialog.open(ModalDetalleCalificacionComponent, dialogConfig);
    
  }

  showCalificar(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height='60%'
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalCalificacionComponent, dialogConfig);
    
  }

}
