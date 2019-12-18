import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { GeneralServiceService } from '../../../Services/general-service.service';
import { funciones } from '../../../../assets/funciones';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

export interface Actividad {
  id: number;
  name: string;
}


let acts: any[] = [];

@Component({
  selector: 'app-modal-generar-garantia',
  templateUrl: './modal-generar-garantia.component.html',
  styleUrls: ['./modal-generar-garantia.component.css']
})
export class ModalGenerarGarantiaComponent implements OnInit {

  public loading = false; //para mostrar los imagen de carga
  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga


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

  @ViewChild('multiSelect' ) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  dateControl = new FormControl('', [
    Validators.required
  ]);
  resultado: any;
  datos: any;
  id: any;
  id_servicio: any;
  duracion:  any[]=[];

  constructor(public dialogRef: MatDialogRef<ModalGenerarGarantiaComponent>,
              public servi: GeneralServiceService,
              public alert: funciones,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private datePipe: DatePipe) {

      if (data) {
        this.id=data.id
      }

  }

  cargarDuracion(){

    this.servi.getAll('duracionGarantia').then((result) => {
      this.resultado = result;
      this.duracion =this.resultado.data;
    }, (err) => {
      console.log(err);
    });

  }

  ngOnInit() {

    this.cargarDuracion()

    this.servi.getAll('condicion').then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          name: this.resultado.data[i].descripcion
        };
        this.banks.push(this.datos);
      }
      console.log(this.banks)

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

  gGaran(){

    if(this.actiMultiCtrl.valid && this.dateControl.valid){

      acts=[]
      for(var i=0;i<this.actiMultiCtrl.value.length;i++){
        acts.push(this.actiMultiCtrl.value[i].id)
      }

      const datos ={
        "idDuracionGarantia":this.dateControl.value,
        "condiciones":acts
      };
      console.log(datos)

      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servi.postFormData(datos,"ordenServicio/"+this.id+"/crearGarantia").then((result) => {
        this.loading = false;
        this.alert.okAlert("Equipo Entregado");
        this.dialogRef.close(datos);
      }, (err) => {
        console.log(err);
        this.dialogRef.disableClose=false;
        this.loading = false;
      });


    }

  }

}
