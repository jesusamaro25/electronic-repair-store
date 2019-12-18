import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../assets/funciones';
import { GeneralServiceService } from '../../Services/general-service.service';
import Swal from 'sweetalert2';
import { ModalComentarioComponent } from './modal-comentario/modal-comentario.component';

export interface TablaData {
  id: number;
  comentario: string;
  respuesta: string;
  tipocomentario: string;
}

let Comentario: any[] = [];

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

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

  displayedColumns: string[] = ['comentario','respuesta','tipo de comentario'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){
    this.servicio.getAll('comentario/usuario').then((result) => {
    this.resultado = result;
    console.log("resultado??: ",this.resultado)
    Comentario = [];
    for (let i = 0; i < this.resultado.data.length; i++) {
      this.datos = {
        id: this.resultado.data[i].id,
        comentario: this.resultado.data[i].descripcion,
        respuesta: this.resultado.data[i].respuesta,
        tipocomentario: this.resultado.data[i].tipoComentario.nombre
      };
      Comentario.push(this.datos);
    }
    this.dataSource = new MatTableDataSource(Comentario);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  },(err) => {
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
    const dialogRef = this.dialog.open(ModalComentarioComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(ModalComentarioComponent, dialogConfig);
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

      this.servicio.delete('comentario',dato.id).then((result) => {
        this.alert.errorAlert("Datos Eliminados");
        this.CargarTabla();
      }, (err) => {
        console.log(err);
      });
      
    }
  })
  }
}
