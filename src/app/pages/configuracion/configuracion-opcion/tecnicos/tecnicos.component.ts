import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { ModalTecnicosComponent } from './modal-tecnicos/modal-tecnicos.component';
import { GeneralServiceService } from '../../../../Services/general-service.service';

export interface TablaData {

  id: number;

  id_tecnico: number;
  tecnico: string;
  imagen: string;
  estatus: string;
}

let Objetivo: any[] = [];

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit {
  // paginacion
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // ordenar resultados
  @ViewChild(MatSort) sort: MatSort;

  // Muestra las columnas en la tabla
  displayedColumns: string[] = ['tecnico', 'descripción', 'actualizar'];
  // Almacena la url base de la imagen
  imagendir;
  dataSource: MatTableDataSource<TablaData>;
  // Objeto para cargar en la tabla creada
  datos: TablaData;
  value: any;

  constructor(
    public dialog: MatDialog,
    public alert: funciones,
    public servi: GeneralServiceService,
    ) {
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }


  CargarTabla() {

    let tecnicos = [];
    this.servi.getAll('tecnicoExhibicion').then((resp: any) => {
     tecnicos = resp.data;
     this.dataSource = new MatTableDataSource(tecnicos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
     console.log(tecnicos);
    }).catch((error) => {
      console.log(error);
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
    const dialogRef = this.dialog.open(ModalTecnicosComponent, dialogConfig);
    // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.CargarTabla();
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
    dialogConfig.data = row;
    // constante donde se guardan los datos que se ingresan en el modal, los parametros
    const dialogRef = this.dialog.open(ModalTecnicosComponent, dialogConfig);
    // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.CargarTabla();
        }
      }
    );
  }



}


