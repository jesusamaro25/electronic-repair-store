import { Component, OnInit, ViewChild, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatSelect, MatDialogConfig } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';
import { funciones } from '../../../assets/funciones';
import { Router } from '@angular/router';
import { GeneralServiceService } from '../../Services/general-service.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { ModalGenerarGarantiaComponent } from './modal-generar-garantia/modal-generar-garantia.component';
import Swal from 'sweetalert2';

export interface TablaData {

  id: number;

  cliente_nombre: string;
  marca_nombre: string;
  modelo_nombre: string;

  problema: string;
  servicio_nombre: number;
  servicio_id: string;
  diagnostico: string;

  estatus: string;

  estatus_p: string;

}

let servicio: any[] = [];
export interface Actividad {
  id: number;
  name: string;
}



@Component({
  templateUrl: 'modal-detalle.html'
})
export class ModalDetalleEntregaComponent {
  dataD: any;
  constructor(
    public dialogRef: MatDialogRef<ModalDetalleEntregaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataD = data;
  }
  onNoClick() {
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: 'modal-detalle-garantia.html'
})
export class ModalDetalleGarantiaComponent implements OnInit, AfterViewInit, OnDestroy {
  rows: String[];
  condicion = new FormControl('', [Validators.required]);
  garantias = [{ nombre: 'Mantenimiento' }, { nombre: 'Reparación de componentes' }, { nombre: 'Sustitución de comonentes' }];
  public loading = false;
  mode = 'indeterminate';
  color = 'primary';


  /** list of banks */
  protected banks: Actividad[] = [];
  /** control for the selected bank for multi-selection */
  public actiMultiCtrl: FormControl = new FormControl('', [
    Validators.required
  ]);

  /** control for the MatSelect filter keyword multi-selection */
  public actiMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredActiMulti: ReplaySubject<Actividad[]> = new ReplaySubject<Actividad[]>(1);

  @ViewChild('multiSelect') multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  costoControl = new FormControl('', [
    Validators.required
  ]);
  resultado: any;
  datos: any;
  id: any;
  id_servicio: any;


  constructor(
    public dialogRef: MatDialogRef<ModalDetalleGarantiaComponent>,
    public servi: GeneralServiceService, public alert: funciones,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id_servicio = data.servicio_id;
  }

  ngOnInit() {
    // set initial selection
    this.servi.getAll('catalogoservicio/' + this.id_servicio).then((result) => {
      this.resultado = result;
      console.log(result);
      for (let i = 0; i < this.resultado.data.actividades.length; i++) {
        this.datos = {
          id: this.resultado.data.actividades[i].id,
          name: this.resultado.data.actividades[i].nombre
        };
        this.banks.push(this.datos);
      }
      console.log(this.banks);

      // load the initial servicio list
      this.filteredActiMulti.next(this.banks.slice());

    }, (err) => {
      console.log(err);
    });

    // load the initial bank list
    this.filteredActiMulti.next(this.banks.slice());

    // listen for search field value changes
    this.actiMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterActiMulti();
      });

  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredActiMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Actividad, b: Actividad) => a && b && a.id === b.id;
      });
  }

  protected filterActiMulti() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.actiMultiFilterCtrl.value;
    if (!search) {
      this.filteredActiMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredActiMulti.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  finalEntrega() {
    this.dialogRef.close();
    this.alert.registroExitoso();
  }
}

@Component({
  selector: 'app-entrega-equipo',
  templateUrl: './entrega-equipo.component.html',
  styleUrls: ['./entrega-equipo.component.css']
})
export class EntregaEquipoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['cliente', 'equipo', 'marca', 'acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;
  modalDiag: any;
  value: any;
  modalData: {
    info: string;
    action: string;
  };
  resultado: any;
  constructor(public modal: MatDialog, public alert: funciones, public ser: GeneralServiceService) {
    this.CargarTabla();
  }


  ngOnInit() {
  }

  CargarTabla() {

    this.ser.getAll('ordenServicio?estatus=Esperando entrega').then((result) => {
      this.resultado = result;
      servicio = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          cliente_nombre: this.resultado.data[i].solicitudServicio.usuario.nombre + ' ' + this.resultado.data[i].solicitudServicio.usuario.apellido,
          marca_nombre: this.resultado.data[i].solicitudServicio.modeloEquipo.marca.nombre,
          modelo_nombre: this.resultado.data[i].solicitudServicio.modeloEquipo.nombre,
          servicio_nombre: this.resultado.data[i].solicitudServicio.catalogoServicio.descripcion,
          servicio_id: this.resultado.data[i].solicitudServicio.catalogoServicio.id,
          problema: this.resultado.data[i].solicitudServicio.descripcion,
          diagnostico: this.resultado.data[i].solicitudServicio.revision.diagnostico,
          estatus: this.resultado.data[i].solicitudServicio.revision.estatusEquipo,
          estatus_p: this.resultado.data[i].solicitudServicio.estatusPresupuesto
        };
        servicio.push(this.datos);
        console.log('servicio', servicio);
      }
      this.dataSource = new MatTableDataSource(servicio);
      this.dataSource.paginator = this.paginator;
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

  verDetalle(row: any) {

    const rows: any[] = row;
    this.modalDiag = this.modal.open(ModalDetalleEntregaComponent, {
      width: '35%',
      data: rows
    });

  }



  entregar(datos) {
    if (datos.estatus_p === 'A' && datos.estatus === 'A') {
      this.verGarantia(datos);
    } else {
    
      this.ser.postFormData(datos,"ordenServicio/"+datos.id+"/entregarSinGarantia").then((result) => {
        this.alert.okAlert("Equipo Entregado");
        this.CargarTabla()
      }, (err) => {
        console.log(err);
      });

    }
  }

  verGarantia(row: any) {

    this.modalDiag = this.modal.open(ModalDetalleGarantiaComponent, {
      width: '35%',
      data: row
    });

  }

  showGarantia(datos){

    if(datos.estatus=='A' && datos.estatus_p == 'A'){

      const dialogConfig = new MatDialogConfig();
      // configuracion del modal con sus caracteristicas, ancho...
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '50%';
      dialogConfig.data=datos;

      const dialogRef = this.modal.open(ModalGenerarGarantiaComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            this.CargarTabla()
          }
        }
      );

    }else{

      Swal.fire({
        text: 'Entregar Equipo?',
        type: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.value) {

          this.ser.postFormData(datos,"ordenServicio/"+datos.id+"/entregarSinGarantia").then((result) => {
            this.alert.okAlert("Equipo Entregado");
            this.CargarTabla()
          }, (err) => {
            console.log(err);
          });
  
        }
      });

    }
    
    
  }


}
