import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { ModalRegistroUsuarioComponent } from './modal-registro-usuario/modal-registro-usuario.component';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';

export interface TablaData {
  id: number;
  nombre: string;
  apellido: string;
  sexo: string;
  correo: string;
  fechaNacimiento: string;
  rol: string;
}

let RegistroUsuario: any[] = [];

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})

export class RegistroUsuarioComponent implements OnInit {

  value: any;
  resultado: any;

  constructor(public servicio: GeneralServiceService,
    public dialog: MatDialog,public alert: funciones)
    { 
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
  
  displayedColumns: string[] = ['nombre','apellido','correo','actualizar'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla()
  {
    this.servicio.getAll('empleado').then((result) => {
      this.resultado = result;
      RegistroUsuario = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre,
          apellido: this.resultado.data[i].apellido,
          sexo: this.resultado.data[i].sexo,
          correo: this.resultado.data[i].correo,
          fechaNacimiento: this.resultado.data[i].fechaNacimiento,
          rol: this.resultado.data[i].rol,
        };
        RegistroUsuario.push(this.datos);
      }

      this.dataSource = new MatTableDataSource(RegistroUsuario);
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
    const dialogRef = this.dialog.open(ModalRegistroUsuarioComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(ModalRegistroUsuarioComponent, dialogConfig);
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

      this.servicio.delete('empleado',dato.id).then((result) => {
        this.alert.errorAlert("Datos Eliminados");
        this.CargarTabla();
      }, (err) => {
        console.log(err);
      });
      
    }
  })
  }
}

