import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { ModalMarcaEquipoComponent } from './modal-marca-equipo/modal-marca-equipo.component';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';

export interface TablaData {

  id: number;
  nombre: string;
  imagen: string;

}

let MarcadeEquipo: any[] = [];

@Component({
  selector: 'app-marca-equipo',
  templateUrl: './marca-equipo.component.html',
  styleUrls: ['./marca-equipo.component.css']
})
export class MarcaEquipoComponent implements OnInit {

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
  displayedColumns: string[] = ['nombre','imagen','actualizar'];
  //Almacena la url base de la imagen
  imagendir;
  dataSource: MatTableDataSource<TablaData>;
  //Objeto para cargar en la tabla creada
  datos: TablaData;
  imagenDefecto: string = "assets/images/default.png"
  
  CargarTabla(){

    this.servicio.getAll('marca').then((result) => {
      this.resultado = result;
      MarcadeEquipo = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          imagen: this.resultado.data[i].urlImagen,
          nombre: this.resultado.data[i].nombre,
        };
        MarcadeEquipo.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(MarcadeEquipo);
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
    const dialogRef = this.dialog.open(ModalMarcaEquipoComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(ModalMarcaEquipoComponent, dialogConfig);
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

      this.servicio.delete('marca',dato.id).then((result) => {
        this.alert.errorAlert("Datos Eliminados");
        this.CargarTabla();
      }, (err) => {
        console.log(err);
      });
      
    }
  })

  }

}

