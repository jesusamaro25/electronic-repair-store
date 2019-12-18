import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { ModalReclamoComponent } from './modal-reclamo/modal-reclamo.component';

export interface TablaData {
  id: number;
  nombre: string;
  estatus: string;
}

let TipoReclamo: any[] = [];

@Component({
  selector: 'app-tipo-reclamo',
  templateUrl: './tipo-reclamo.component.html',
  styleUrls: ['./tipo-reclamo.component.css']
})
export class TipoReclamoComponent implements OnInit {
  value: any;
  constructor(public dialog: MatDialog,public alert: funciones) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
    // paginacion
    @ViewChild(MatPaginator ) paginator: MatPaginator;
    // ordenar reS
    sultados
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['nombre','actualizar'];
    dataSource: MatTableDataSource<TablaData>;
    datos: TablaData;

    CargarTabla(){

      TipoReclamo=[
        {
          id: '1',
          nombre: 'Tiempo de Servicio superado',
          estatus: 'a'
        },
        {
          id: '2',
          nombre: 'Fallo antes de terminar garantia',
          estatus: 'a'
        }
        
      ]
  
      this.dataSource = new MatTableDataSource(TipoReclamo);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    }

    filtro(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    eliminar(dato){
      this.alert.eliminar(dato.nombre);
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
      const dialogRef = this.dialog.open(ModalReclamoComponent, dialogConfig);
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
      const dialogRef = this.dialog.open(ModalReclamoComponent, dialogConfig);
      // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.CargarTabla()
          }
        }
      );
    }

}
