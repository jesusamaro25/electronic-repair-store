import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../assets/funciones';
import { GeneralServiceService } from '../../Services/general-service.service';
import { ModalCrearPromocionComponent } from './modal-crear-promocion/modal-crear-promocion.component';
import Swal from 'sweetalert2';

export interface TablaData {

  id: number;
  nombre: string;
  imagen: string;
  descripcion:string;
  f_inicio: string;
  f_fin: string;

  descuento: any;
  id_descuento: number;

  id_catalogo: number;

}

let promocion: any[] = [];

@Component({
  selector: 'app-crear-promocion',
  templateUrl: './crear-promocion.component.html',
  styleUrls: ['./crear-promocion.component.css']
})
export class CrearPromocionComponent implements OnInit {

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
  @ViewChild(MatPaginator ) paginator: MatPaginator;
  // ordenar resultados
  @ViewChild(MatSort) sort: MatSort;

  //Muestra las columnas en la tabla
  displayedColumns: string[] = ['nombre','imagen','descuento','actualizar'];
  //Almacena la url base de la imagen
  imagendir;
  dataSource: MatTableDataSource<TablaData>;
  //Objeto para cargar en la tabla creada
  datos: TablaData;
  imagenDefecto: string = "assets/images/default.png"
  
  CargarTabla(){

    this.servicio.getAll('promocion').then((result) => {
      this.resultado = result;
      promocion = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre,
          imagen: this.resultado.data[i].urlImagen,
          descripcion: this.resultado.data[i].descripcion,
          f_inicio: this.resultado.data[i].fechaInicio,
          f_fin: this.resultado.data[i].fechaExpiracion,

          descuento: this.resultado.data[i].descuento.nombre,
          id_descuento: this.resultado.data[i].descuento.id,

          id_catalogo: this.resultado.data[i].catalogoServicio.id,
        };
        promocion.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(promocion);
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
    dialogConfig.maxHeight = '600px';
    // constante donde se guardan los datos que se ingresan en el modal, los parametros
    const dialogRef = this.dialog.open(ModalCrearPromocionComponent, dialogConfig);
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
    dialogConfig.maxHeight = '600px';
    dialogConfig.data=row;
    // constante donde se guardan los datos que se ingresan en el modal, los parametros
    const dialogRef = this.dialog.open(ModalCrearPromocionComponent, dialogConfig);
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

      this.servicio.delete('promocion',dato.id).then((result) => {
        this.alert.errorAlert("Datos Eliminados");
        this.CargarTabla();
      }, (err) => {
        console.log(err);
      });
      
    }
  })

  }

}
