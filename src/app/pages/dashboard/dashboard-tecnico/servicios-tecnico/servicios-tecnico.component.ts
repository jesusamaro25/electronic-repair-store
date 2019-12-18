import { Component, OnInit, ViewChild } from '@angular/core';
import { funciones } from '../../../../../assets/funciones';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogConfig } from '@angular/material';
import { ModalDetallesComponent } from './modal-detalles/modal-detalles.component';
import { Router } from '@angular/router';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';

export interface TablaData {

  id: number;

  cliente_nombre: string;
  marca_nombre: string;
  modelo_nombre: string;

  problema: string;
  servicio_nombre: number;

}

let servicio: any[] = [];

@Component({
  selector: 'app-servicios-tecnico',
  templateUrl: './servicios-tecnico.component.html',
  styleUrls: ['./servicios-tecnico.component.css']
})
export class ServiciosTecnicoComponent implements OnInit {
  resultado: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['cliente', 'servicio', 'problema', 'acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;
  data: any;

  constructor(public dialog: MatDialog, public alert: funciones, private router: Router, public serv: GeneralServiceService) {
  }

  ngOnInit() {
    this.CargarTabla();
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

  CargarTabla() {
    this.serv.getAll('ordenServicio/enReparacion').then((result) => {
      this.resultado = result;
      servicio = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {

          id: this.resultado.data[i].id,
          cliente_nombre: this.resultado.data[i].solicitudServicio.usuario.nombre + ' '
           + this.resultado.data[i].solicitudServicio.usuario.apellido,
          marca_nombre: this.resultado.data[i].solicitudServicio.modeloEquipo.marca.nombre,
          modelo_nombre: this.resultado.data[i].solicitudServicio.modeloEquipo.nombre,
          problema: this.resultado.data[i].solicitudServicio.descripcion,
          servicio_nombre: this.resultado.data[i].solicitudServicio.catalogoServicio.descripcion
        };
        servicio.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(servicio);
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });

  }

  showDetalles(datos) {
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = datos;

    const dialogRef = this.dialog.open(ModalDetallesComponent, dialogConfig);

  }

  goToPage(pageName: string, param: number) {
    this.router.navigate([`${pageName}`, { id: param }]);
  }

  finalizar(datos){
    Swal.fire({
      text: "Deseas finalizar la reparacion?",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.value) {

          const post = new FormData();
          this.serv.postFormData(post,'ordenServicio/'+datos.id+'/completarReparacion').then((result) => {
            
            this.data=result
            if(this.data.status==false){
              this.alert.errorAlert("Faltan Actividades Por Completar");
            }else{
              this.alert.okAlert("Reparacion Completada");
              this.CargarTabla();
            }

          }, (err) => {
            console.log(err);
          });

        }
    })
  }
}
