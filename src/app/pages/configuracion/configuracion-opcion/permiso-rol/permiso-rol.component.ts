import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { funciones } from '../../../../../assets/funciones';
 import {ModalPermisoRolComponent} from './modal-permiso-rol/modal-permiso-rol.component';
  import { MatSelect } from '@angular/material';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';
 
export interface TablaData {
  id: number;
  nombre: string;
  estatus: string;
}

export interface permisos {
  id: number;
  nombre: string;
  estatus: string;

}

let TipoPermiso: any[] = [];


@Component({
  selector: 'app-permiso-rol',
  templateUrl: './permiso-rol.component.html',
  styleUrls: ['./permiso-rol.component.css']
})

export class PermisoRolComponent implements OnInit {

  datos = { id:'',nombre:'',tipoRol:'', permisos:''};
  incluir: boolean = false;
  id: string;

  rol: any = [];
  permisosxrol: any = [];
  permisosnoagregadosxrol: any = [];
  resultado: any;
  resultado2: any;

  rolControl = new FormControl('',[
    Validators.required
  ]);

  value: any;
    constructor(
      public dialog: MatDialog,
      public alert: funciones,
      public servicio: GeneralServiceService ) { 
      this.CargarTablas();
      this.CargarRoles();
    }
  
    ngOnInit() {
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    }
  
    // paginacion
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // ordenar resultados
    @ViewChild(MatSort) sort: MatSort;
  
    displayedColumns: string[] = ['nombre','actualizar'];
    dataSource: MatTableDataSource<TablaData>;
    dato: TablaData;

    CargarRoles(){
      this.servicio.getAll('rol?includeJefe=true').then((result) => {
        this.resultado = result;
        this.rol = this.resultado.data;
      })
    }

    CargarTablas(){
      this.servicio.getAll('rol/'+this.rolControl.value).then((result) => {
      this.resultado = result;
      this.permisosxrol = this.resultado.data.permisos;

      /*this.servicio.getAll('rol/'+this.rolControl.value+'/permisosnoagregados').then((result2) => {
        this.resultado2 = result2;
        console.log("que trae resultado2 ", this.resultado2 )
        this.permisosnoagregadosxrol = this.resultado2.data;
      })*/

      this.dataSource = new MatTableDataSource(this.permisosxrol);
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
      dialogConfig.data = this.rolControl.value;
      // constante donde se guardan los datos que se ingresan en el modal, los parametros
      const dialogRef = this.dialog.open(ModalPermisoRolComponent, dialogConfig);
      // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.CargarTablas()
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
      const dialogRef = this.dialog.open(ModalPermisoRolComponent, dialogConfig);
      // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.CargarTablas()
          }
        }
      );
    }
  
    /*eliminar(dato){
      this.alert.eliminar(dato);
    }*/
    eliminar(dato){
    
      Swal.fire({
        title: 'Deseas eliminar'+' '+dato.nombre+'?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
  
      }).then((result) => {if (result.value) {
  
        this.servicio.delete('rol/'+this.rolControl.value+'/permisos',dato.id).then((result) => {
          this.alert.errorAlert("Datos Eliminados");
          this.CargarTablas();
        }, (err) => {
          console.log(err);
        });
        
      }})
  
    }  
  }
  