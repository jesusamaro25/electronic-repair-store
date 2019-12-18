import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../assets/funciones';
import { ModalDetallesCalificarComponent } from './modal-detalles-calificar/modal-detalles-calificar.component';
import { ModalCalificarComponent } from './modal-calificar/modal-calificar.component';
import { GeneralServiceService } from '../../Services/general-service.service';

export interface TablaData {

  id: number;

  marca_nombre: string;
  modelo_nombre: string;
  costo_revision: number;
  costo_servicio: number;

  problema: string,
  servicio_nombre: string;
  promocion: string;

}

let servicio: any[] = [];

@Component({
  selector: 'app-calificar-servicio',
  templateUrl: './calificar-servicio.component.html',
  styleUrls: ['./calificar-servicio.component.css']
})
export class CalificarServicioComponent implements OnInit {
  resultado: any;

  constructor(public dialog: MatDialog,public alert: funciones,public ser: GeneralServiceService) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.paginator=this.paginator;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['equipo','servicio','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){

    servicio=[
      {
        id: '1',

        marca_nombre:'Sony',
        modelo_nombre: 'PS4',

        problema:'la consola  prende desde hace 3 semanas',
        diagnostico:'daño de la fuente de poder',
        servicio_nombre: 'Reparacion de consolas',
        promocion_nombre: 'Descuento especial en consolas',
        descuento: 20,
        costo_revision: 10000,
        costo_servicio: 20000,

      },
      {
        id: '2',

        marca_nombre:'Samsung',
        modelo_nombre: 'S4',

        problema:'el tactil no me sirve',
        diagnostico:'averia de pantalla completa por caida',
        servicio_nombre: 'Reparacion de celulares',
        promocion_nombre: '',
        descuento: 0,
        costo_revision: 30000,
        costo_servicio: 40000,

      },
      {
        id: '3',

        marca_nombre:'Samsung',
        modelo_nombre: 'S5',

        problema:'el tactil no me sirve',
        diagnostico:'averia de tactil de la pantalla, resulta irreparable en el modelo del telefono',
        servicio_nombre: 'Reparacion de celulares',
        promocion_nombre: '',
        descuento: 0,
        costo_revision: 50000,
        costo_servicio: 60000,
      }
      
    ]

    this.ser.getAll('ordenServicio/sinCalificarServicioCliente').then((result) => {
      this.resultado = result;
      servicio = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          marca_nombre: this.resultado.data[i].solicitudServicio.modeloEquipo.marca.nombre,
          modelo_nombre:this.resultado.data[i].solicitudServicio.modeloEquipo.nombre,
          servicio_nombre:this.resultado.data[i].solicitudServicio.catalogoServicio.descripcion,
          problema: this.resultado.data[i].solicitudServicio.descripcion,
          costo_revision: this.resultado.data[i].solicitudServicio.revision.costo,
          costo_servicio: this.resultado.data[i].solicitudServicio.presupuesto,
          promocion: this.resultado.data[i].solicitudServicio.promocion
        };
        servicio.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(servicio);
      this.dataSource.paginator = this.paginator;
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

    const dialogRef = this.dialog.open(ModalDetallesCalificarComponent, dialogConfig);
    
  }

  showCalificar(datos){
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height='60%'
    dialogConfig.data=datos;

    const dialogRef = this.dialog.open(ModalCalificarComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.CargarTabla()
        }
      }
    );
    
  }

}
