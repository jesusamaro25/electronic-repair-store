import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { ModalServiciosComponent } from './modal-servicios/modal-servicios.component';
import { GeneralServiceService } from '../../../../Services/general-service.service';

export interface TablaData {

  id: number;
  descripcion: string;
  catalogoServicio: [];
}

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  value:any;
  constructor(
    public dialog: MatDialog,
    public alert: funciones,
    public servicio: GeneralServiceService) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  // paginacion
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // ordenar resultados
  @ViewChild(MatSort) sort: MatSort;

  //Muestra las columnas en la tabla
  displayedColumns: string[] = ['servicio','descripcion','actualizar'];
  //Almacena la url base de la imagen
  imagendir;
  dataSource: MatTableDataSource<TablaData>;
  //Objeto para cargar en la tabla creada
  datos: TablaData;
  imagenDefecto: string = "assets/images/default.png";

  resultado:any;
  ServiciosExhibicion: any = [];

  CargarTabla(){

    this.servicio.getAll('servicioexhibicion').then((result) => {
      this.resultado = result;
      this.ServiciosExhibicion = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          descripcion: this.resultado.data[i].descripcion,
          catalogoServicio: this.resultado.data[i].catalogoServicio
        };
        this.ServiciosExhibicion.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(this.ServiciosExhibicion);
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
    const dialogRef = this.dialog.open(ModalServiciosComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(ModalServiciosComponent, dialogConfig);
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


