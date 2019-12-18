import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../assets/funciones';
//import { ModalDetallesRevisionComponent } from './modal-detalles/modal-detalles.component';
//import { ModalRevisionComponent } from './modal-revision/modal-revision.component';
import { GeneralServiceService } from '../../Services/general-service.service';
import { ModalDetallesReclamosComponent } from './modal-detalles-reclamos/modal-detalles-reclamos.component';
import { ModalRevisionReclamosComponent } from './modal-revision-reclamos/modal-revision-reclamos.component';

export interface TablaData {

  id: number;

  cliente_nombre: string;
  marca_nombre: string;
  modelo_nombre: string;

  problema: string,
  servicio_nombre: number;

}

let servicio: any[] = [];


@Component({
  selector: 'app-revision-reclamos',
  templateUrl: './revision-reclamos.component.html',
  styleUrls: ['./revision-reclamos.component.css']
})
export class RevisionReclamosComponent implements OnInit {
  resultado: any;

  constructor(public dialog: MatDialog,public alert: funciones,public ser: GeneralServiceService) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.paginator=this.paginator;
  }

  @ViewChild(MatPaginator ) paginator: MatPaginator;

  displayedColumns: string[] = ['equipo','problema','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){

    this.ser.getAll('solicitudServicio?estatus=NR').then((result) => {
      this.resultado = result;
      servicio = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          cliente_nombre: this.resultado.data[i].usuario.nombre+" "+this.resultado.data[i].usuario.apellido,
          marca_nombre: this.resultado.data[i].modeloEquipo.marca.nombre,
          modelo_nombre:this.resultado.data[i].modeloEquipo.nombre,
          servicio_nombre:this.resultado.data[i].catalogoServicio.descripcion,
          problema: this.resultado.data[i].descripcion
        };
        servicio.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(servicio);
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });

  }

  showDetalles(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalDetallesReclamosComponent, dialogConfig);
    
  }

  showRevision(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalRevisionReclamosComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.CargarTabla()
        }
      }
    );
    
  }

}
