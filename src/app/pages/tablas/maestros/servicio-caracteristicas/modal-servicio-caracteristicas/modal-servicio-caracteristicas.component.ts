import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';

export interface caracteristica {
  id: string;
  name: string;
}

export const CARACTERISTICAS: caracteristica[] = [
  {name: 'Caracteristica  1',  id: 'A'},
  {name: 'Caracteristica  2',  id: 'B'},
  {name: 'Caracteristica  3',  id: 'C'},
  {name: 'Caracteristica  4 ', id: 'D'},
];


@Component({
  selector: 'app-modal-servicio-caracteristicas',
  templateUrl: './modal-servicio-caracteristicas.component.html',
  styleUrls: ['./modal-servicio-caracteristicas.component.css']
})
export class ModalServicioCaracteristicasComponent implements OnInit , AfterViewInit, OnDestroy  {

  /** list of banks */
  protected banks: caracteristica[] = CARACTERISTICAS;

  /** control for the selected bank for multi-selection */
  public actiMultiCtrl: FormControl = new FormControl('', [
    Validators.required
  ]);

  /** control for the MatSelect filter keyword multi-selection */
  public actiMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredActiMulti: ReplaySubject<caracteristica[]> = new ReplaySubject<caracteristica[]>(1);

  @ViewChild('multiSelect' ) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  costoControl = new FormControl('', [
    Validators.required
  ]);


  constructor() {  }

  ngOnInit() {
        // set initial selection

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
        this.multiSelect.compareWith = (a: caracteristica, b: caracteristica) => a && b && a.id === b.id;
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

}
