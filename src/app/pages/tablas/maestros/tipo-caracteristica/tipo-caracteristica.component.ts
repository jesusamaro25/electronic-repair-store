import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';
import { ModalTipoCaracteristicaComponent } from './modal-tipo-caracteristica/modal-tipo-caracteristica.component';
export interface TablaData {
  id: number;
  nombre: string;
  
  
}

let TipoCaracteristica: any[] = [];

@Component({
  selector: 'app-tipo-caracteristica',
  templateUrl: './tipo-caracteristica.component.html',
  styleUrls: ['./tipo-caracteristica.component.css']
})

export class TipoCaracteristicaComponent implements OnInit {
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
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // ordenar resultados
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['nombre','actualizar'];
    dataSource: MatTableDataSource<TablaData>;
    datos: TablaData;

    CargarTabla(){

    this.servicio.getAll('tipoCaracteristicaCliente').then((result) => {
      console.log(result)
      this.resultado = result;
      TipoCaracteristica = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
       this.datos = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre,
       };
       TipoCaracteristica.push(this.datos);
    }
    this.dataSource = new MatTableDataSource(TipoCaracteristica);
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
      dialogConfig.width = '50%';
      // constante donde se guardan los datos que se ingresan en el modal, los parametros
      const dialogRef = this.dialog.open(ModalTipoCaracteristicaComponent, dialogConfig);
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
      dialogConfig.width = '50%';
      dialogConfig.data=row;
      // constante donde se guardan los datos que se ingresan en el modal, los parametros
      const dialogRef = this.dialog.open(ModalTipoCaracteristicaComponent, dialogConfig);
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
      this.servicio.delete('tipoCaracteristicaCliente',dato.id).then((result) => {
        this.alert.errorAlert("Datos Eliminados");
        this.CargarTabla();
      }, (err) => {
        console.log(err);
      });
      
    }})

  }

}

