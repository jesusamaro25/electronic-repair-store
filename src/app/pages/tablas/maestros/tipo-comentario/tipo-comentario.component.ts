import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { ModalTipoComentarioComponent } from './modal-tipo-comentario/modal-tipo-comentario.component';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';

export interface TablaData {
  id: number;
  nombre: string;
}

let TipoComentario: any[] = [];
@Component({
  selector: 'app-tipo-comentario',
  templateUrl: './tipo-comentario.component.html',
  styleUrls: ['./tipo-comentario.component.css']
})
export class TipoComentarioComponent implements OnInit {
  value: any;
  resultado: any;
  tipoComentario: any = [];

  constructor(public dialog: MatDialog,
    public alert: funciones,
    public servicio: GeneralServiceService) { 
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
      this.servicio.getAll('tipocomentario').then((result) => {
      this.resultado = result;
      this.tipoComentario = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre
        };
        this.tipoComentario.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(this.tipoComentario);
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

    eliminar(dato){
      Swal.fire({
  
        title: 'Deseas eliminar'+' '+dato.nombre+'?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
  
      }).then((result) => {if (result.value) {
  
        this.servicio.delete('tipocomentario',dato.id).then((result) => {
          this.alert.errorAlert("Datos Eliminados");
          this.CargarTabla();
        }, (err) => {
          console.log(err);
        });
        
      }
    })
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
      const dialogRef = this.dialog.open(ModalTipoComentarioComponent, dialogConfig);
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
      const dialogRef = this.dialog.open(ModalTipoComentarioComponent, dialogConfig);
      // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            console.log("que trae data en actualizar? :", data)
            this.CargarTabla()
          }
        }
      );
    }

}
