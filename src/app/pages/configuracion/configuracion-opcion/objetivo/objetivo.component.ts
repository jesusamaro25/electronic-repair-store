import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { ModalObjetivoComponent } from './modal-objetivo/modal-objetivo.component';

export interface TablaData {

  id: number;
  nombre: string;
  imagen: string;
  estatus: string;
}

let Objetivo: any[] = [];

@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.component.html',
  styleUrls: ['./objetivo.component.css']
})
export class ObjetivoComponent implements OnInit {

  value:any;
  constructor(public dialog: MatDialog,public alert: funciones) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  // paginacion
  @ViewChild(MatPaginator ) paginator: MatPaginator;
  // ordenar resultados
  @ViewChild(MatSort ) sort: MatSort;

  //Muestra las columnas en la tabla
  displayedColumns: string[] = ['nombre','imagen','actualizar'];
  //Almacena la url base de la imagen
  imagendir;
  dataSource: MatTableDataSource<TablaData>;
  //Objeto para cargar en la tabla creada
  datos: TablaData;
  imagenDefecto: string = "assets/images/default.png"
  CargarTabla(){

    Objetivo=[
      {
        id: '1',
        nombre: 'Organizar la información del mundo y ...',
        imagen: "assets/images/mision.jpg",
        estatus: 'a'
      }
    ]

    this.dataSource = new MatTableDataSource(Objetivo);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
    const dialogRef = this.dialog.open(ModalObjetivoComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(ModalObjetivoComponent, dialogConfig);
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
    this.alert.eliminar(dato);
  }

}


