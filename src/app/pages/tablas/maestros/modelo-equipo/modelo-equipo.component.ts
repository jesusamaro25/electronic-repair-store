import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { ModalModeloEquipoComponent } from './modal-modelo-equipo/modal-modelo-equipo.component';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';

export interface TablaData {

  id: number;

  id_marca: number;
  marca: string;

  id_tipo: number;
  tipo: string;
  
  nombre: string;
}

let ModeloEquipo: any[] = [];

@Component({
  selector: 'app-modelo-equipo',
  templateUrl: './modelo-equipo.component.html',
  styleUrls: ['./modelo-equipo.component.css']
})
export class ModeloEquipoComponent implements OnInit {
  value: any;
  resultado: any;
  constructor(public dialog: MatDialog,public alert: funciones,public servicio: GeneralServiceService) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  // paginacion
  @ViewChild(MatPaginator ) paginator: MatPaginator;
  // ordenar resultados
  @ViewChild(MatSort ) sort: MatSort;

  displayedColumns: string[] = ['nombre','marca','tipo','actualizar'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){

    this.servicio.getAll('modeloEquipo').then((result) => {
      this.resultado = result;
      ModeloEquipo = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre,
          id_marca: this.resultado.data[i].marca.id,
          marca:this.resultado.data[i].marca.nombre,
          id_tipo: this.resultado.data[i].tipoEquipo.id,
          tipo: this.resultado.data[i].tipoEquipo.nombre
        };
        ModeloEquipo.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(ModeloEquipo);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  showRegistrar() // abre una ventana modal para el registro
  {
    // constante creada para un nuevo modal.
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    // constante donde se guardan los datos que se ingresan en el modal, los parametros
    const dialogRef = this.dialog.open(ModalModeloEquipoComponent, dialogConfig);
    // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.CargarTabla()
        }
      }
    );
  }

  showActualizar(row) // abre una ventana modal para el registro 
  {
    // constante creada para un nuevo modal.
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data=row;
    // constante donde se guardan los datos que se ingresan en el modal, los parametros
    const dialogRef = this.dialog.open(ModalModeloEquipoComponent, dialogConfig);
    // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.CargarTabla()
        }
      }
    );
  }

  eliminar(dato){
    
    Swal.fire({

      title: 'Deseas eliminar'+' '+dato.nombre+'?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {if (result.value) {

      this.servicio.delete('modeloEquipo',dato.id).then((result) => {
        this.alert.errorAlert("Datos Eliminados");
        this.CargarTabla();
      }, (err) => {
        console.log(err);
      });
      
    }})

  }

}
