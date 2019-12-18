import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';
import { GeneralServiceService } from '../../../../../Services/general-service.service';
import { funciones } from '../../../../../../assets/funciones';

export interface permiso {
  id: string;
  name: string;
}

/*export const PERMISOS: permiso[] = [
  {name: 'Registrar Solicitud',   id: 'A'},
  {name: 'Evaluar Solicitud',     id: 'B'},
  {name: 'Entrega de Equipo',     id: 'C'},
 
];*/

@Component({
  selector: 'app-modal-permiso-rol',
  templateUrl: './modal-permiso-rol.component.html',
  styleUrls: ['./modal-permiso-rol.component.css']
})
export class ModalPermisoRolComponent implements  OnInit, AfterViewInit, OnDestroy  {

  resultado: any;
  permisosnoagregadosxrol: any = [];
  datos: any;

  /** list of banks */
  protected banks: permiso[] = []
  //this.permisosnoagregadosxrol;

  /** control for the selected bank for multi-selection */
  public actiMultiCtrl: FormControl = new FormControl('', [
    Validators.required
  ]);

  /** control for the MatSelect filter keyword multi-selection */
  public actiMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredActiMulti: ReplaySubject<permiso[]> = new ReplaySubject<permiso[]>(1);

  @ViewChild('multiSelect' ) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  costoControl = new FormControl('', [
    Validators.required
  ]);
  
  idRol:any;
  permisos:any = [];


  constructor(public dialogRef: MatDialogRef<ModalPermisoRolComponent>,
    public alert: funciones,
    public servicio: GeneralServiceService,
    @Inject(MAT_DIALOG_DATA) public data:any
   ) {
     if(data){
       this.idRol = this.data;
     }
  }

  ngOnInit() {
    this.servicio.getAll('rol/'+this.idRol+'/permisosnoagregados').then((result) => {
      this.resultado = result;
  
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          name: this.resultado.data[i].nombre
        };
        this.banks.push(this.datos);
      }
      console.log("banks: ", this.banks)

      // load the initial servicio list
      this.filteredActiMulti.next(this.banks.slice());
    })

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
        this.multiSelect.compareWith = (a: permiso, b: permiso) => a && b && a.id === b.id;
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

  guardar(){
    if(this.actiMultiCtrl.valid){
      this.permisos=[];
      for(var i=0;i<this.actiMultiCtrl.value.length;i++){
        this.permisos.push(this.actiMultiCtrl.value[i].id)
      }
        
        const datos ={
          "permisos":this.permisos
        };
        console.log(datos)
        this.servicio.postFormData(datos,"rol/"+this.idRol+"/permisos").then((result) => {
          this.alert.okAlert("Permisos Agregados");
          this.dialogRef.close(datos);
        }, (err) => {
          console.log(err);
          this.dialogRef.disableClose=false;
        });
      
    }
  }

}
