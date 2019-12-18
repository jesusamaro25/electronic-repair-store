import { Component, OnInit, ViewChild } from '@angular/core';
import { funciones } from '../../../../../assets/funciones';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, MatDialogConfig } from '@angular/material';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import { ModalDetallesEvapresuComponent } from './modal-detalles-evapresu/modal-detalles-evapresu.component';
import { ModalPresuComponent } from './modal-presu/modal-presu.component';
import Swal from 'sweetalert2';


export interface TablaData {

  id: number;

  marca_nombre: string;
  modelo_nombre: string;

  problema: string,
  servicio_nombre: number;

  estatus: string;

  motivo: string;
  diagnostico: string;
  costo_revision: number;
  presupuesto: number;
  id_orden: number;
  promocion: any;

}

let servicio: any[] = [];
let motivos: any[] = [];

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {
  resultado: any;
  darray: any;

  constructor(public dialog: MatDialog,public alert: funciones,public servi: GeneralServiceService) {
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort

  }

  @ViewChild(MatPaginator ) paginator: MatPaginator;
  @ViewChild(MatSort ) sort: MatSort;


  displayedColumns: string[] = ['equipo','servicio','estado','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){

    this.servi.getAll('solicitudServicio/presupuestoCliente').then((result) => {
      this.resultado = result;
      servicio = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          marca_nombre: this.resultado.data[i].modeloEquipo.marca.nombre,
          modelo_nombre:this.resultado.data[i].modeloEquipo.nombre,
          servicio_nombre:this.resultado.data[i].catalogoServicio.descripcion,
          problema:this.resultado.data[i].descripcion,
          estatus:this.resultado.data[i].estatusPresupuesto,
          motivo:this.resultado.data[i].descripcion,
          diagnostico: this.resultado.data[i].revision.diagnostico,
          costo_revision:this.resultado.data[i].revision.costo,
          presupuesto:this.resultado.data[i].presupuesto,
          id_orden: this.resultado.data[i].ordenServicio.id,
          promocion: this.resultado.data[i].promocion
        };
        servicio.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(servicio);
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

  showDetalles(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalDetallesEvapresuComponent, dialogConfig);
    
  }

  showPresupuesto(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data=datos;
    dialogConfig.maxWidth = '600px';

    const dialogRef = this.dialog.open(ModalPresuComponent, dialogConfig);
    
  }

  aprobar(datos){
    Swal.fire({
      text: "Quieres aprobar este presupuesto?",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.value) {

          const post = new FormData();
          this.servi.postFormData(post,'solicitudServicio/'+datos.id+'/aceptarPresupuesto').then((result) => {
            this.alert.okAlert("Presupuesto Aprobado");
            this.CargarTabla();
          }, (err) => {
            console.log(err);
          });

        }
    })
  }

  async rechazar(datos){
    
    this.servi.getAll('motivoRechazo/tiporechazo/Presupuesto').then(async (result) => {
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
        title: 'Deseas rechazar este presupuesto?',
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
              this.servi.postFormData(post,'solicitudServicio/'+datos.id+'/rechazarPresupuesto').then((result) => {
                this.alert.errorAlert("Presupuesto Rechazado");
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

}
