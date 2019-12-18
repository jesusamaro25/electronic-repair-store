import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import {  ModalImagenesWebComponent } from './modal-imagenes-web/modal-imagenes-web.component';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';


export interface TablaData {

  id: number;
  imagen: string;

}
let Imagenesweb: any[] = [];

@Component({
  selector: 'app-imagenes-web',
  templateUrl: './imagenes-web.component.html',
  styleUrls: ['./imagenes-web.component.css']
})
 


export class ImagenesWebComponent implements OnInit {
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
  @ViewChild(MatPaginator ) paginator: MatPaginator;
  // ordenar resultados
  @ViewChild(MatSort ) sort: MatSort;

  displayedColumns: string[] = ['imagen','actualizar'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;


  CargarTabla(){

    this.servicio.getAll('carrusel').then((result) => {
      this.resultado = result;
      Imagenesweb = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          imagen: this.resultado.data[i].url_imagen,
        };
        Imagenesweb.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(Imagenesweb);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
      console.log(err);
    });

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
    const dialogRef = this.dialog.open(ModalImagenesWebComponent, dialogConfig);
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

      title: 'Deseas eliminar la imagen?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {if (result.value) {

      this.servicio.delete('carrusel',dato.id).then((result) => {
        this.alert.errorAlert("Datos Eliminados");
        this.CargarTabla();
      }, (err) => {
        console.log(err);
      });
      
    }
  })

  }

}






 
