import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig, MatSort } from '@angular/material';
import { funciones } from '../../../assets/funciones';
import { ModalDetallesComponent } from './modal-detalles/modal-detalles.component';
import Swal from 'sweetalert2';
import { GeneralServiceService } from '../../Services/general-service.service';

export interface TablaData {

  id: number;

  cliente_nombre: string;
  marca_nombre: string;
  modelo_nombre: string;
  fecha_solicitud: Date;

  servicio_nombre: number;

}

let Solicitud: any[] = [];
let Tecnicos: any[] = [];
let motivos: any[] = [];

@Component({
  selector: 'app-evaluar-solicitud',
  templateUrl: './evaluar-solicitud.component.html',
  styleUrls: ['./evaluar-solicitud.component.css']
})
export class EvaluarSolicitudComponent implements OnInit {

  value:any;
  resultado: any;
  darray: { id: any; nombre: string; };

  constructor(public dialog: MatDialog,public alert: funciones,public servicio: GeneralServiceService) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.paginator=this.paginator;
  }

  @ViewChild(MatPaginator ) paginator: MatPaginator;
  @ViewChild(MatSort ) sort: MatSort;

  displayedColumns: string[] = ['cliente','equipo','marca','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){

    this.servicio.getAll('solicitudServicio?estatus=NE').then((result) => {
      this.resultado = result;
      Solicitud = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          cliente_nombre: this.resultado.data[i].usuario.nombre+" "+this.resultado.data[i].usuario.apellido,
          marca_nombre: this.resultado.data[i].modeloEquipo.marca.nombre,
          modelo_nombre:this.resultado.data[i].modeloEquipo.nombre,
          servicio_nombre:this.resultado.data[i].catalogoServicio.descripcion,
          fecha_solicitud:this.resultado.data[i].fechaCreacion,
        };
        Solicitud.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(Solicitud);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
      console.log(err);
    });

  }

  showDetalles(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalDetallesComponent, dialogConfig);
    
  }

  async rechazar(datos){
    
    this.servicio.getAll('motivoRechazo/tiporechazo/Solicitud').then(async (result) => {
      this.resultado = result;
      motivos = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.darray = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].descripcion
        };
        motivos.push(this.darray);
      }


    let obj={};

    motivos.forEach(item => obj[item.id] = item.nombre);

    console.log(obj);

    const {value: tec} = await Swal.fire({
        title: 'Deseas rechazar esta solicitud?',
        input: 'select',
        type:'question',
        inputOptions: obj,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        inputPlaceholder: 'Selecciona el motivo del rechazo',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {

            if (value) {
          
              const post = new FormData();
              post.append('idMotivoRechazo',value);
              this.servicio.postFormData(post,'solicitudServicio/'+datos.id+'/rechazarSolicitud').then((result) => {
                this.alert.errorAlert("Solicitud Rechazada");
                this.CargarTabla();
              }, (err) => {
                console.log(err);
              });

              resolve()

            } else {
              resolve('Debes seleccionar un motivo!')
            }
          })
        }
      })

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

  async evaluarSolicitud(datos){

    this.servicio.getAll('solicitudServicio/'+datos.id+'/empleadosDisponibles').then(async (result) => {
      this.resultado = result;
      Tecnicos = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.darray = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre+" "+this.resultado.data[i].apellido
        };
        Tecnicos.push(this.darray);
      }


    let obj={};

    Tecnicos.forEach(item => obj[item.id] = item.nombre);

    console.log(obj);

    const {value: tec} = await Swal.fire({
        title: 'Deseas Aprobar esta solicitud?',
        input: 'select',
        type:'question',
        inputOptions: obj,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        inputPlaceholder: 'Selecciona el tecnico para la revision',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {

            if (value) {

              const post = new FormData();
              post.append('idUsuario',value);
              this.servicio.postFormData(post,'solicitudServicio/'+datos.id+'/aceptarSolicitud').then((result) => {
                this.alert.okAlert("Solicitud Aprobada");
                this.CargarTabla();
              }, (err) => {
                console.log(err);
              });

              resolve()

            } else {
              resolve('Debes seleccionar un tecnico!')
            }
          })
        }
      })

    }, (err) => {
      console.log(err);
    });

    

  }

}
