import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { ModalDetallesGarantiaComponent } from './modal-detalles-garantia/modal-detalles-garantia.component';
import { ModalCrearGarantiaComponent } from './modal-crear-garantia/modal-crear-garantia.component';
import { funciones } from '../../../../assets/funciones';
import { GeneralServiceService } from '../../../Services/general-service.service';

export interface TablaData {

  id: number;

  modelo_nombre: string;
  problema: string,
  servicio_nombre: number;
  fecha_vencimiento: Date;
  marca: string;
  condiciones: any;

}

let servicio: any[] = [];

@Component({
  selector: 'app-tab-servicio',
  templateUrl: './tab-servicio.component.html',
  styleUrls: ['./tab-servicio.component.css']
})
export class TabServicioComponent implements OnInit {

  resultado: any;

  constructor(public dialog: MatDialog,public alert: funciones,public ser: GeneralServiceService) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.paginator=this.paginator;
  }

  @ViewChild(MatPaginator ) paginator: MatPaginator;

  displayedColumns: string[] = ['equipo','servicio','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){

    this.ser.getAll('solicitudServicio/conGarantia').then((result) => {
      this.resultado = result;
      servicio = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          modelo_nombre:this.resultado.data[i].modeloEquipo.nombre,
          servicio_nombre:this.resultado.data[i].catalogoServicio.descripcion,
          problema: this.resultado.data[i].descripcion,
          fecha_vencimiento: this.resultado.data[i].ordenServicio.garantia.fechaExpiracion,
          marca: this.resultado.data[i].modeloEquipo.marca.nombre,
          condiciones: this.resultado.data[i].ordenServicio.garantia.condiciones
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
    dialogConfig.height= '70%';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalDetallesGarantiaComponent, dialogConfig);
    
  }

  showGarantia(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalCrearGarantiaComponent, dialogConfig);
    
  }

}
