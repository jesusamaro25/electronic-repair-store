import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../../Services/general-service.service';
import { funciones } from '../../../assets/funciones';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';


export interface Actividad {
  id: number;
  name: string;
}


@Component({
  selector: 'app-difundir-promocion',
  templateUrl: './difundir-promocion.component.html',
  styleUrls: ['./difundir-promocion.component.css']
})

export class DifundirPromocionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('multiSelect') multiSelect: MatSelect;
  public loading = false;
  mode = 'indeterminate';
  color = 'primary';
  protected banks: Actividad[] = [];
  public actiMultiCtrl: FormControl = new FormControl('', [
    Validators.required
  ]);

  public actiMultiFilterCtrl: FormControl = new FormControl();
  public filteredActiMulti: ReplaySubject<Actividad[]> = new ReplaySubject<Actividad[]>(1);
  protected _onDestroy = new Subject<void>();
  public promociones = [];
  promocionId = new FormControl('', [
    Validators.required
  ]);

  resultado: any;
  datos: any;
  id: any;
  id_servicio: any;
  duracion: any[] = [];

  constructor(
    public serv: GeneralServiceService,
    private alert: funciones,
  ) { }

  ngOnInit() {
    this.obtenerPromociones();
    this.obtenerCaracteristicas();
    this.filteredActiMulti.next(this.banks.slice());
    this.actiMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterActiMulti();
      });
  }

  private obtenerPromociones() {
    this.serv.getAll('promocion').then((result: any) => {
      this.promociones = result.data;
    }, (err) => {
      console.log(err);
    });
  }

  private obtenerCaracteristicas() {
    this.serv.getAll('CaracteristicaCliente?autoperfilado=true').then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          name: this.resultado.data[i].nombre
        };
        this.banks.push(this.datos);
      }
      console.log(this.banks);
      // load the initial servicio list
      this.filteredActiMulti.next(this.banks.slice());
    }, (err) => {
      console.log(err);
    });
  }

  public difundirPromocion() {
    const ids = [];
    this.actiMultiCtrl.value.forEach(element => {
      ids.push(element.id);
    });
    if (this.actiMultiCtrl.valid && this.promocionId.valid) {
      this.serv.postFormData(
        {
          idCaracteristicasCliente: ids
        },
        `promocion/${this.promocionId.value}/difundir`)
        .then((resp: any) => {
          this.alert.okAlert('Promoción difundida con exito');
          this.actiMultiCtrl.reset();
          this.promocionId.reset();
        }).catch((error) => {
          this.alert.errorAlert('Ocurrio un error al intentar difundir la promoción');
          console.log(error);
        });
    }else {
      this.alert.errorAlert('Verifica los campos');
      console.log('error');
    }
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredActiMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelect.compareWith = (a: Actividad, b: Actividad) => a && b && a.id === b.id;
      });
  }

  protected filterActiMulti() {
    if (!this.banks) {
      return;
    }
    let search = this.actiMultiFilterCtrl.value;
    if (!search) {
      this.filteredActiMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredActiMulti.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
