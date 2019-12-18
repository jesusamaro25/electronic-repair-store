import { Component, OnInit, ViewChild } from '@angular/core';
import { funciones } from '../../../assets/funciones';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogConfig } from '@angular/material';
import { ModalDetalleServiciosReclamoComponent } from './modal-detalle-servicios-reclamo/modal-detalle-servicios-reclamo.component';
import { Router } from '@angular/router';


export interface TablaData {

  id: number;

  cliente_nombre: string;
  marca_nombre: string;
  modelo_nombre: string;

  diagnostico: string,
  servicio_nombre: number;
  promocion_nombre: string;

  estatus: string;

}

let servicio: any[] = [];


@Component({
  selector: 'app-servicios-reclamo',
  templateUrl: './servicios-reclamo.component.html',
  styleUrls: ['./servicios-reclamo.component.css']
})
export class ServiciosReclamoComponent implements OnInit {



  constructor(public dialog: MatDialog,public alert: funciones,private router: Router) {
    this.CargarTabla();
   }

  ngOnInit() {
    this.dataSource.paginator=this.paginator;
  }

  @ViewChild(MatPaginator ) paginator: MatPaginator;

  displayedColumns: string[] = ['cliente','servicio','diagnostico','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){

    servicio=[
      {
        id: '1',

        cliente_nombre: 'Donai Torin',
        marca_nombre:'Sony',
        modelo_nombre: 'PS4',

        diagnostico:'la consola  no prende',
        servicio_nombre: 'Reparacion de consolas',
        promocion_nombre: 'Descuento especial en consolas',

        estatus: 'e'
      },
      {
        id: '2',

        cliente_nombre: 'Andreina Rojas',
        marca_nombre:'Samsung',
        modelo_nombre: 'S4',

        diagnostico:'el tactil no me sirve',
        servicio_nombre: 'Reparacion de celulares',
        promocion_nombre: '',

        estatus: 'r'
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
    dialogConfig.width = '500px';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalDetalleServiciosReclamoComponent, dialogConfig);
    
  }


    finalizar(datos){
    this.alert.finalizarReclamo(datos);
  }

   goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
