import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { ModalCaracteristicasClienteComponent } from './modal-caracteristicas-cliente/modal-caracteristicas-cliente.component';
import { funciones } from '../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';

export interface TablaData {
  id: number;

  id_tipo: number;
  tipo_caracteristicas: string;

  nombre: string;
}

let CaracteristicasCliente: any[] = [];

@Component({
  selector: 'app-caracteristicas-cliente',
  templateUrl: './caracteristicas-cliente.component.html',
  styleUrls: ['./caracteristicas-cliente.component.css']
})


export class CaracteristicasClienteComponent implements OnInit {
value: any;
resultado: any;
  constructor(public dialog: MatDialog,public alert: funciones,public servicio: GeneralServiceService) { 
    this.CargarTabla();
  }

  ngOnInit() 
  {
    this.dataSource=new MatTableDataSource();
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  // paginacion
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // ordenar resultados
  @ViewChild(MatSort) sort: MatSort;

   displayedColumns: string[] = ['nombre','tipo_caracteristicas','actualizar'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

    CargarTabla(){

     this.servicio.getAll('CaracteristicaCliente').then((result) => {
      this.resultado = result;
      CaracteristicasCliente = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre,
          id_tipo: this.resultado.data[i].tipoCaracteristicaCliente.id,
          tipo_caracteristicas: this.resultado.data[i].tipoCaracteristicaCliente.nombre

        };
        CaracteristicasCliente.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(CaracteristicasCliente);
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
    const dialogRef = this.dialog.open(ModalCaracteristicasClienteComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(ModalCaracteristicasClienteComponent, dialogConfig);
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
      this.servicio.delete('preguntaCalificacion',dato.id).then((result) => {
        this.alert.errorAlert("Datos Eliminados");
        this.CargarTabla();
      }, (err) => {
        console.log(err);
      });
      
    }})

  }



}
