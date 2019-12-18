import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { ModalCaracteristicasComponent } from './modal-caracteristicas/modal-caracteristicas.component';
import { GeneralServiceService } from '../../../../Services/general-service.service';

export interface TablaData {

  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;

}

let Objetivo: any[] = [];

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent implements OnInit {

  value:any;
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

  //Muestra las columnas en la tabla
  displayedColumns: string[] = ['servicio','descripcion','imagen','actualizar'];
  //Almacena la url base de la imagen
  imagendir;
  dataSource: MatTableDataSource<TablaData>;
  //Objeto para cargar en la tabla creada
  datos: TablaData;
  imagenDefecto: string = "assets/images/default.png"

  CargarTabla(){

    this.servicio.getAll('caracteristicaEmpresa').then((result) => {
      this.resultado = result;
      Objetivo = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          imagen: this.resultado.data[i].urlImagen,
          titulo: this.resultado.data[i].titulo,
          descripcion: this.resultado.data[i].descripcion
        };
        Objetivo.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(Objetivo);
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
    const dialogRef = this.dialog.open(ModalCaracteristicasComponent, dialogConfig);
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


