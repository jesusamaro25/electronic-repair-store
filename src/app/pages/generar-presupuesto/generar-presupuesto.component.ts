import { Component, OnInit, ViewChild } from '@angular/core';
import { funciones } from '../../../assets/funciones';
import { MatDialog, MatTableDataSource, MatDialogConfig, MatPaginator } from '@angular/material';
import { ModalDetallesGPresupuestoComponent } from './modal-detalles-g-presupuesto/modal-detalles-g-presupuesto.component';
import { ModalGPresupuestoComponent } from './modal-g-presupuesto/modal-g-presupuesto.component';
import { GeneralServiceService } from '../../Services/general-service.service';

export interface TablaData {

  id: number;

  cliente_nombre: string;
  marca_nombre: string;
  modelo_nombre: string;

  problema: string,
  servicio_nombre: string;
  servicio_id: number;
  diagnostico: string;

}

let servicio: any[] = [];

@Component({
  selector: 'app-generar-presupuesto',
  templateUrl: './generar-presupuesto.component.html',
  styleUrls: ['./generar-presupuesto.component.css']
})
export class GenerarPresupuestoComponent implements OnInit {
  resultado: any;

  constructor(public dialog: MatDialog,public alert: funciones,public ser: GeneralServiceService) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.paginator=this.paginator;
  }

  @ViewChild(MatPaginator ) paginator: MatPaginator;

  displayedColumns: string[] = ['cliente','equipo','diagnostico','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){

    this.ser.getAll('solicitudServicio?estatus=SP').then((result) => {
      this.resultado = result;
      servicio = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          cliente_nombre: this.resultado.data[i].usuario.nombre+" "+this.resultado.data[i].usuario.apellido,
          marca_nombre: this.resultado.data[i].modeloEquipo.marca.nombre,
          modelo_nombre:this.resultado.data[i].modeloEquipo.nombre,
          servicio_nombre:this.resultado.data[i].catalogoServicio.descripcion,
          servicio_id:this.resultado.data[i].catalogoServicio.id,
          problema: this.resultado.data[i].descripcion,
          diagnostico: this.resultado.data[i].revision.diagnostico,
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

    const dialogRef = this.dialog.open(ModalDetallesGPresupuestoComponent, dialogConfig);
    
  }

  showPresupuesto(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalGPresupuestoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.CargarTabla()
        }
      }
    );
    
  }

}
