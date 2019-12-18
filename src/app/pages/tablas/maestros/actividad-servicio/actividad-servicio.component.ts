import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { funciones } from '../../../../../assets/funciones';
import { ModalActividadPorServicioComponent } from './modal-actividad-por-servicio/modal-actividad-por-servicio.component';
import { MatSelect } from '@angular/material';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';


export interface TablaData {
  id:number;
  nombre:string;
  descripcion: string;
  catalogoServicio:string;
  costo: number;
}
export interface TablaData2 {
  id: number;
  id_tiposervicio: number;
  id_tipoequipo: number;
  descripcion: string;
}

let Actividad: any[] = [];


@Component({
  selector: 'app-actividad-servicio',
  templateUrl: './actividad-servicio.component.html',
  styleUrls: ['./actividad-servicio.component.css']
})


export class ActividadServicioComponent implements OnInit {

  datos: TablaData;
  datos2: TablaData2;
  datoss = { nombre: '', estatus: 'A' };
  incluir: boolean = false;
  id: string;

  value: any;
  resultado: any;

  CatalogoServicio: any[] = [];
  ActividadesxCatalogoServicio: any[] = [];

  servicioControl = new FormControl('', [
    Validators.required
  ]);
  
  constructor(public dialog: MatDialog, public alert: funciones,public servicio: GeneralServiceService) {
    //this.CargarTabla();
    this.CargarComboBox();
    this.CargarActividades();
    console.log("CatalogoServicio en Constructor:? ",this.CatalogoServicio);
    console.log("ActXCatalogoServicio en Constructor:? ",this.ActividadesxCatalogoServicio);
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

  displayedColumns: string[] = ['descripcion','costo','actualizar'];
  dataSource: MatTableDataSource<TablaData>;

  /*probar(){
    this.ActividadesxServicio=[];
    for(let i=0;i<Actividad.length;i++){
      if(this.servicioControl.value == Actividad[i].catalogoServicio.id){
        console.log(Actividad[i].nombre);
        this.ActividadesxServicio.push(Actividad[i])
      }
    }
    console.log("Esta es la actXservicio: ", this.ActividadesxServicio)
    console.log("El valor?: ", this.servicioControl.value);
    this.dataSource = new MatTableDataSource(this.ActividadesxServicio);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/

  CargarComboBox(){
    this.servicio.getAll('catalogoservicio').then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos2 = {
          id: this.resultado.data[i].id,
          descripcion: this.resultado.data[i].descripcion,
          id_tipoequipo: this.resultado.data[i].tipoEquipo.id,
          id_tiposervicio: this.resultado.data[i].tipoServicio.id
        };
        this.CatalogoServicio.push(this.datos2);
      }
    }, (err) => {
      console.log(err);
    });
  }
  
  CargarActividades(){
    this.servicio.getAll('actividad').then((result) => {
      this.resultado = result;
      Actividad = [];
      //this.ActividadesxServicio = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          descripcion: this.resultado.data[i].descripcion,
          nombre: this.resultado.data[i].nombre,
          catalogoServicio: this.resultado.data[i].catalogoServicio,
          costo: this.resultado.data[i].costo
        };
        //this.ActividadesxServicio.push(this.datos);
        Actividad.push(this.datos);
      }
      this.ActividadesxCatalogoServicio=[];
      for(let i=0;i<Actividad.length;i++){
        if(this.servicioControl.value == Actividad[i].catalogoServicio.id){
          console.log(Actividad[i].nombre);
          this.ActividadesxCatalogoServicio.push(Actividad[i])
        }
      }
      console.log("Esta es la actXservicio: ", this.ActividadesxCatalogoServicio)
      console.log("El valor?: ", this.servicioControl.value);
      this.dataSource = new MatTableDataSource(this.ActividadesxCatalogoServicio);
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
    dialogConfig.data = this.servicioControl.value;
    // constante donde se guardan los datos que se ingresan en el modal, los parametros
    const dialogRef = this.dialog.open(ModalActividadPorServicioComponent, dialogConfig);
    // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.CargarActividades();
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
    dialogConfig.data = row;
    // constante donde se guardan los datos que se ingresan en el modal, los parametros
    const dialogRef = this.dialog.open(ModalActividadPorServicioComponent, dialogConfig);
    // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.CargarActividades()
        }
      }
    );
  }

  eliminar(dato){
    console.log("Dato?: ",dato)
    Swal.fire({
      title: 'Deseas eliminar'+' '+dato.descripcion+'?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {if (result.value) {
      this.servicio.delete('actividad',dato.id).then((result) => {
        this.alert.errorAlert("Datos Eliminados");
        this.CargarActividades();
      }, (err) => {
        console.log(err);
      });
    }})

  }

}
