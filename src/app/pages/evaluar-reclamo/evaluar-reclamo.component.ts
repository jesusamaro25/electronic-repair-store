import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../assets/funciones';
import { ModalDetalleComponent } from './modal-detalle/modal-detalle.component';
import Swal from 'sweetalert2';


export interface TablaData {

  id: number;

  cliente_nombre: string;
  marca_nombre: string;
  modelo_nombre: string;
  fecha_solicitud: Date;

  problema: string,
  servicio_nombre: number;
  promocion_nombre: string;
  fecha_revision: Date;
  hora_revision: string;

  estatus: string;

}

let Solicitud: any[] = [];


@Component({
  selector: 'app-evaluar-reclamo',
  templateUrl: './evaluar-reclamo.component.html',
  styleUrls: ['./evaluar-reclamo.component.css']
})
export class EvaluarReclamoComponent implements OnInit {

  constructor(public dialog: MatDialog,public alert: funciones) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource.paginator=this.paginator;
  }

  @ViewChild(MatPaginator ) paginator: MatPaginator;

  displayedColumns: string[] = ['reclamo','descripcion','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){

    Solicitud=[
      {
        id: '1',
        cliente_nombre:'Luis Ramos',
        marca_nombre: 'Samsung',
        modelo_nombre:'J7',
        tipo_reclamo: 'Atencion al cliente',
        fecha_reclamo: '05/07/2019',
        descripcion:'Mala atencion al publico',
  
        estatus: 'e'
      },
      {
        id: '2',

        cliente_nombre:'Maria Perez',
        marca_nombre: 'LG',
        modelo_nombre:'G4',
        tipo_reclamo: 'Servicion tecnico',
        fecha_reclamo: '05/07/2019',
        descripcion:'Mi equipo estaba bueno',
  
        estatus: 'e'

        
      }
      
    ]

    this.dataSource = new MatTableDataSource(Solicitud);
    this.dataSource.paginator = this.paginator;

  }

  showDetalle(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalDetalleComponent, dialogConfig);
    
  }

  async aprobar(datos){
    const {value: text} = await Swal.fire({
      title: 'Deseas Aprobar este reclamo?',
      input: 'select',
      inputOptions: {
        apples: 'Luis Ramos',
        bananas: 'Donai Torin',
        grapes: 'Madelein Tovar',
        oranges: 'Juan Almao'
      },
      type:'question',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      inputPlaceholder: 'Selecciona el tecnico para el reclamo',
      showCancelButton: true,
       inputValidator: (value) => {
        if (!value) {
          return 'Debes seleccionar un tecnico!'
        }
      }
    })
    if (text) {
      Swal.fire({
        toast: true,
        type:'success',
        titleText:'Reclamo Aprobado',
        showConfirmButton: false,
        timer: 2000,
        position: 'top-right'
    })
    }
  }

  async rechazar(datos){
    const {value: text} = await Swal.fire({
      title: 'Quieres rechazar este reclamo?',
      type:'question',
      input: 'textarea',
      inputPlaceholder:'Indique su motivo.',
      showCancelButton: true,
      confirmButtonText:'Rechazar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes indicar un motivo!'
        }
      }
    })
    if (text) {
      Swal.fire({
        toast: true,
        type:'success',
        titleText:'Reclamo Rechazado',
        showConfirmButton: false,
        timer: 2000,
        position: 'top-right'
    })
    }
  }
   

}



