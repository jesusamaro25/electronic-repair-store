import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogConfig, MatSort } from '@angular/material';
import { ModalTimelineSolicitudesComponent } from './modal-timeline-solicitudes/modal-timeline-solicitudes.component';
import { ModalDetallesSolicitudesComponent } from './modal-detalles-solicitudes/modal-detalles-solicitudes.component';
import { GeneralServiceService } from '../../../../Services/general-service.service';

export interface TablaData {

  id: number;

  marca_nombre: string;
  modelo_nombre: string;
  fecha_solicitud: Date;

  problema: string,
  servicio_nombre: number;
  fecha_revision: Date;
  fecha_actividad: Date;
  hora_revision: string;

  motivo_rechazo: any;
  promocion: any;

  estatus: string;

}

let servicio: any[] = [];

@Component({
  selector: 'app-solicitudes-cliente',
  templateUrl: './solicitudes-cliente.component.html',
  styleUrls: ['./solicitudes-cliente.component.css']
})
export class SolicitudesClienteComponent implements OnInit {

  @ViewChild(MatPaginator ) paginator: MatPaginator;
  @ViewChild(MatSort ) sort: MatSort;

  displayedColumns: string[] = ['equipo','servicio','estado','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;
  resultado: any;

  constructor(public dialog: MatDialog,public servi: GeneralServiceService) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  CargarTabla(){
    
    this.servi.getAll('solicitudServicio/cliente').then((result) => {
      this.resultado = result;
      servicio = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
         
          marca_nombre: this.resultado.data[i].modeloEquipo.marca.nombre,
          modelo_nombre:this.resultado.data[i].modeloEquipo.nombre,
          servicio_nombre:this.resultado.data[i].catalogoServicio.descripcion,
          fecha_solicitud:this.resultado.data[i].fechaCreacion,
          fecha_actividad:this.resultado.data[i].agendas,
          motivo_rechazo:this.resultado.data[i].motivoRechazo,
          promocion: this.resultado.data[i].promocion,
          problema:this.resultado.data[i].descripcion,

          fecha_revision:this.resultado.data[i].revision.fechaCreacion,
          hora_revision:this.resultado.data[i].revision.fechaCreacion,

          estatus: this.resultado.data[i].estatus
        };
        servicio.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(servicio);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
      console.log(err);
    });

  }

  showTimeline(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.maxHeight = '460px';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalTimelineSolicitudesComponent, dialogConfig);
    
  }

  showDetalles(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalDetallesSolicitudesComponent, dialogConfig);
    
  }

}
