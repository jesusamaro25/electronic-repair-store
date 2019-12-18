import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogConfig, MatSort } from '@angular/material';
import { ModalDetallesEquipoReparacionComponent } from './modal-detalles-equipo-reparacion/modal-detalles-equipo-reparacion.component';
import { ModalTimelineEquiposReparacionComponent } from './modal-timeline-equipos-reparacion/modal-timeline-equipos-reparacion.component';
import { Router } from '@angular/router';
import { GeneralServiceService } from '../../Services/general-service.service';

export interface TablaData {

  id: number;

  marca_nombre: string;
  diagnostico: string;
  modelo_nombre: string;
  costo_revision: number;
  costo_servicio: number;

  problema: string,
  servicio_nombre: number;

}

let servicio: any[] = [];

@Component({
  selector: 'app-equipos-reparacion',
  templateUrl: './equipos-reparacion.component.html',
  styleUrls: ['./equipos-reparacion.component.css']
})
export class EquiposReparacionComponent implements OnInit {
  resultado: any;

  constructor(public dialog: MatDialog,private router: Router,public serv: GeneralServiceService) {
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort ) sort: MatSort;

  displayedColumns: string[] = ['equipo','servicio','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;



  CargarTabla() {
    this.serv.getAll('ordenServicio/enReparacion').then((result) => {
      this.resultado = result;
      servicio = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        
        this.datos = {

          id: this.resultado.data[i].id,
          marca_nombre: this.resultado.data[i].solicitudServicio.modeloEquipo.marca.nombre,
          modelo_nombre: this.resultado.data[i].solicitudServicio.modeloEquipo.nombre,
          problema: this.resultado.data[i].solicitudServicio.descripcion,
          servicio_nombre: this.resultado.data[i].solicitudServicio.catalogoServicio.descripcion,
          costo_revision: this.resultado.data[i].solicitudServicio.revision.costo,
          costo_servicio: this.resultado.data[i].solicitudServicio.presupuesto,
          diagnostico: this.resultado.data[i].solicitudServicio.revision.diagnostico

        };

        servicio.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(servicio);
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });

  }


  filtro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDetalles(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalDetallesEquipoReparacionComponent, dialogConfig);
    
  }

  showTimeline(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.maxHeight = '460px';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalTimelineEquiposReparacionComponent, dialogConfig);
    
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
