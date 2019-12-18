import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { funciones } from '../../../../assets/funciones';
import { ModalEspecialidadComponent } from './modal-especialidad/modal-especialidad.component';
import { GeneralServiceService } from '../../../Services/general-service.service';



export interface TablaData {
  id: number;
  descripcion: string;
  estatus: string;
}

@Component({
  selector: 'app-usuario-especialidad',
  templateUrl: './usuario-especialidad.component.html',
  styleUrls: ['./usuario-especialidad.component.css']
})
export class UsuarioEspecialidadComponent implements OnInit {
  value: any;
  // paginacion
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // ordenar resultados
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['descripcion', 'actualizar'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;
  constructor(public dialog: MatDialog, public alert: funciones,
    public servi: GeneralServiceService) {
    this.CargarTabla();
  }

  ngOnInit() {

  }

  showRegistrar() {
    // constante creada para un nuevo modal.
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    // constante donde se guardan los datos que se ingresan en el modal, los parametros
    const dialogRef = this.dialog.open(ModalEspecialidadComponent, dialogConfig);
    // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
    dialogRef.afterClosed().subscribe(
      data => {
          this.CargarTabla();
      }
    );
  }

  CargarTabla() {
    let especialidad: any;
    this.servi.getAll('empleado/' + localStorage.getItem('id') + '/especialidad')
      .then((result: any) => {
        especialidad = result.data;
        this.dataSource = new MatTableDataSource(especialidad);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }).catch((err: any) => {
        console.error(err);
      });
  }
  filtro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async eliminar(dato) {
    if ( await this.alert.eliminar(dato.descripcion)) {
      console.log('delete');
      this.servi.delete('empleado/' + localStorage.getItem('id') + '/especialidad', dato.id)
      .then(() => {
        this.CargarTabla();
      }).catch(() => {

      });
    }
  }
}


