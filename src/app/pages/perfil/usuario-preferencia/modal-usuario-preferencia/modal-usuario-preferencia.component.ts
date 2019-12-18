import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect, MatDialogRef } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import { funciones } from '../../../../../assets/funciones';

export interface Actividad {
  id: string;
  name: string;
}

export const ACTIVIDADES: Actividad[] = [];

let acts: any[] = [];
@Component({
  selector: 'app-modal-usuario-preferencia',
  templateUrl: './modal-usuario-preferencia.component.html',
  styleUrls: ['./modal-usuario-preferencia.component.css']
})


export class ModalUsuarioPreferenciaComponent implements OnInit, AfterViewInit, OnDestroy {

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
  resultado: any;
  datos: any;

  constructor(public servi: GeneralServiceService,public dialogRef: MatDialogRef<ModalUsuarioPreferenciaComponent>,public alert: funciones) {  }

  ngOnInit() {
        // set initial selection
    this.servi.getAll('cliente/'+localStorage.getItem('id')+'/caracteristicasClienteNoAgregadas').then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          name: this.resultado.data[i].nombre
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

  //ejemplo para recorrer el form control
  print(){

    for(var i=0;i<this.actiMultiCtrl.value.length;i++){
      console.log(this.actiMultiCtrl.value[i].name) 
    }

    for(let bank of this.actiMultiCtrl.value){
      console.log(bank.name) 
    }
    
  }

  gCaracteristicas(){

    if(this.actiMultiCtrl.valid){

      acts=[]
      for(var i=0;i<this.actiMultiCtrl.value.length;i++){
        acts.push(this.actiMultiCtrl.value[i].id)
      }

      const datos ={
        "caracteristicasCliente":acts
      };
      console.log(datos)

      this.loading = true;
      this.dialogRef.disableClose=true;

      this.servi.postFormData(datos,"cliente/"+localStorage.getItem('id')+"/caracteristicasCliente").then((result) => {
        this.loading = false;
        this.alert.okAlert("Preferencias Agregadas");
        this.dialogRef.close(datos);
      }, (err) => {
        console.log(err);
        this.dialogRef.disableClose=false;
        this.loading = false;
      });

    }

  }

}

