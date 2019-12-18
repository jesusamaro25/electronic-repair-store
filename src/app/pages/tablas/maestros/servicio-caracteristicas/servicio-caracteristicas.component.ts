import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { funciones } from '../../../../../assets/funciones';
import { MatSelect } from '@angular/material';
import { ModalServicioCaracteristicasComponent } from './modal-servicio-caracteristicas/modal-servicio-caracteristicas.component';

export interface TablaData {
  id: number;
  nombre: string;
  estatus: string;
}

export interface actividad {
  id: number;
  nombre: string;
  estatus: string;
}

let Actividad: any[] = [];

@Component({
  selector: 'app-servicio-caracteristicas',
  templateUrl: './servicio-caracteristicas.component.html',
  styleUrls: ['./servicio-caracteristicas.component.css']
})
export class ServicioCaracteristicasComponent implements OnInit {

  datos = { nombre: '', estatus: 'A' };
  incluir: boolean = false;
  id: string;

  servicio: any[] = [
    {
      id: 's1',
      nombre: 'Reparacion'
    },
    {
      id: 's2',
      nombre: 'Mantenimiento'
    },
    {
      id: 's3',
      nombre: 'Revision'
    }
  ];

  servicioControl = new FormControl('', [
    Validators.required
  ]);

  value: any
  constructor(public dialog: MatDialog, public alert: funciones) {
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // paginacion
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // ordenar resultados
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nombre', 'actualizar'];
  dataSource: MatTableDataSource<TablaData>;
  dato: TablaData;

  CargarTabla() {

    Actividad = [
      {
        id: '1',
        nombre: 'caracteristica 1',
        estatus: 'a'
      },
      {
        id: '2',
        nombre: 'caracteristica 2',
        estatus: 'a'
      }

    ]

    this.dataSource = new MatTableDataSource(Actividad);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
    const dialogRef = this.dialog.open(ModalServicioCaracteristicasComponent, dialogConfig);
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
    dialogConfig.data = row;
    // constante donde se guardan los datos que se ingresan en el modal, los parametros
    const dialogRef = this.dialog.open(ModalServicioCaracteristicasComponent, dialogConfig);
    // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.CargarTabla()
        }
      }
    );
  }

  eliminar(dato) {
    this.alert.eliminar(dato);
  }

}
