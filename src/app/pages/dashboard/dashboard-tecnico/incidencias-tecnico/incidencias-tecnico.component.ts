import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig, MatSort } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import Swal from 'sweetalert2';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import { ModalDetallesIncidenciaComponent } from './modal-detalles-inscidencia/modal-detalles-incidencia.component';


export interface TablaData {

  id: number;
  idTipoIncidencia: string;
  descripcionIncidencia: string;
  fechaActividad: Date;
}

let Incidencia: any[] = [];

@Component({
  selector: 'app-incidencias-tecnico',
  templateUrl: './incidencias-tecnico.component.html',
  styleUrls: ['./incidencias-tecnico.component.css']
})
export class IncidenciasTecnicoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  value: any;
  resultado: any;
  displayedColumns: string[] = ['tipo', 'descripcion', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;
  constructor(public dialog: MatDialog, public alert: funciones, public servicio: GeneralServiceService) {
    this.CargarTabla();
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

  CargarTabla() {

    this.servicio.getAll('empleado/incidencias').then((result) => {
      this.resultado = result;
      Incidencia = this.resultado.data;
      // for (let i = 0; i < this.resultado.data.length; i++) {
      //   this.datos = {
      //     id: this.resultado.data[i].id,
      //     descripcionIncidencia: this.resultado.data[i].incidencia.descripcion,
      //     idTipoIncidencia: this.resultado.data[i].incidencia.tipoIncidencia.nombre,
      //     fechaActividad: this.resultado.data[i].fechaCreacion,
      //   };
      //   Incidencia.push(this.datos);
      // }
      this.dataSource = new MatTableDataSource(Incidencia);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
      console.log(err);
    });

  }
  showDetalles(datos) {
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = datos;

    const dialogRef = this.dialog.open(ModalDetallesIncidenciaComponent, dialogConfig);

  }


}
