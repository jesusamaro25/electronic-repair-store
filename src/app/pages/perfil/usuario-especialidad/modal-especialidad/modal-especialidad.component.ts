import { Component, OnInit, Inject, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';


@Component({
  selector: 'app-modal-especialidad',
  templateUrl: './modal-especialidad.component.html',
  styleUrls: ['./modal-especialidad.component.css']
})
export class ModalEspecialidadComponent implements OnInit, OnDestroy, AfterViewInit {
  public loading = false;
  mode = 'indeterminate';
  color = 'primary';


  /** list of banks */
  protected banks: any[] = [];
  /** control for the selected bank for multi-selection */
  public actiMultiCtrl: FormControl = new FormControl('', [
    Validators.required
  ]);

  /** control for the MatSelect filter keyword multi-selection */
  public actiMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredActiMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

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


  constructor(public dialogRef: MatDialogRef<ModalEspecialidadComponent>, public servi: GeneralServiceService, public alert: funciones,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.id = data.id;
      this.id_servicio = data.servicio_id;
    }
  }

  ngOnInit() {
    // set initial selection
    this.servi.getAll( 'empleado/' + localStorage.getItem('id') + '/especialidadNoAgregada')
    .then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          descripcion: this.resultado.data[i].descripcion
        };
        this.banks.push(this.datos);
      }

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
        this.multiSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
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

  // ejemplo para recorrer el form control
  guardarEspecalidades() {
    if (this.actiMultiCtrl.valid ) {

      const espe = [];
      for (let i = 0; i < this.actiMultiCtrl.value.length; i++) {
        espe.push(this.actiMultiCtrl.value[i].id);
      }


      this.loading = true;
      this.dialogRef.disableClose = true;
      const data = {
        catalogoServicio: espe
      };
      this.servi.postFormData(data, 'empleado/' + localStorage.getItem('id') + '/especialidad').then((result) => {
        this.loading = false;
        this.alert.okAlert('Especialidades Agregadas con exito');
        this.dialogRef.close(espe);
      }, (err) => {
        console.log(err);
        this.dialogRef.disableClose = false;
        this.loading = false;
      });

    }

  }

}
