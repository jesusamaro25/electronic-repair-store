import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import {
  addWeeks,
  subWeeks,
} from 'date-fns';
import * as moment from 'moment';
import { identifierModuleUrl } from '@angular/compiler';
import { flatMap, isEmpty } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../../Services/general-service.service';
import { funciones } from '../../../assets/funciones';
import { Router, ActivatedRoute } from '@angular/router';


type CalendarPeriod = 'day' | 'week';


@Component({
  selector: 'app-planificacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css'],
})
export class PlanificacionComponent implements OnInit, OnDestroy {

  public datepicker: Date = new Date();
  week = [];
  actividades: any[] = [];
  resultado: any;
  dia: FormControl = new FormControl;
  horas: any[] = [];
  opcDia: any;
  opcHora: any;
  opcActividad: any;
  fecha: any;
  inicio: any;
  fin: any;
  cambio: boolean;

  CalendarView = CalendarView;

  view: CalendarPeriod = 'week';
  viewDate = new Date();
  auxDate: any;
  locale = 'es';
  StartHour = 7;
  EndHour = 18;
  form_descripcion = {
    actividad_id: '',
    fecha_plan: '',
    horario_id: '',
    tecnico_id: '',
    id_servicio: '',
    estatus: ''
  };
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  minDate: Date = subWeeks(new Date(), 0);
  maxDate: Date = addWeeks(new Date(), 1);
  prevBtnDisabled = false;
  nextBtnDisabled = false;
  disableServ = true;
  disableDesc = true;
  disableAct = true;
  disableDia = true;
  disableAbo = false;
  idDia: any;
  idBloque: any;
  idServicio: any;
  id: any;
  refresh: Subject<any> = new Subject();
  agendaForm: FormGroup;
  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    public servi: GeneralServiceService,
    public swa: funciones,
    route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id');

  }

  // metodo limitar dias calendario
  ngOnInit() {
    this.agendaForm = new FormGroup({
      idUsuario: new FormControl('', []),
      idBloqueHorario: new FormControl('', [
        Validators.required
      ]),
      fechaActividad: new FormControl('', [
        Validators.required
      ]),
      idActividad: new FormControl('', [
        Validators.required
      ]),
      idOrdenServicio: new FormControl('', [])
    });
    this.getWeek(this.viewDate);
    this.cargarEventosAgenda();
    this.cargarActrividades();
    this.cargarBloqueHorario();
  }

  getWeek(fromDate) { // funcion que retorna el arreglo de las fechas de la semana elegida
    const date = new Date(fromDate);
    const sunday = new Date(date.setDate(date.getDate() - date.getDay()));
    let s = new Date(sunday);
    const result = [moment(s, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('L')];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
      s = new Date(sunday);
      result.push(moment(s, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('L'));
    }
    this.week = result;
  }

  CargarServicio() {
    const datos = {
      id: '1',
      name: 'Reparacion'
    };

    this.form_descripcion.id_servicio = datos.id;
  }

  ComboBloqueHora(id) {
    /*this.Horas = [];
    let index = this.horario.findIndex(x => x.id_dia === id);
    let i = 0;
    while (i < this.horario[index].horario.length ) {
      this.Horas.push(this.horario[index].horario[i]);
      i++;
    }*/
  }

  cargarfecha(fecha, hora_inicio, hora_fin) {
    this.inicio = new Date(parseInt(moment(fecha, ['DD-MM-YYYY']).format('YYYY'), 10),
      parseInt(moment(fecha, ['DD-MM-YYYY']).format('MM'), 10) - 1,
      parseInt(moment(fecha, ['DD-MM-YYYY']).format('DD'), 10),
      parseInt(moment(hora_inicio, ['LT']).format('HH'), 10) - 4,
      parseInt(moment(hora_inicio, ['LT']).format('mm'), 10),
      parseInt(moment(hora_inicio, ['LT']).format('ss'), 10));
    this.fin = new Date(parseInt(moment(fecha, ['DD-MM-YYYY']).format('YYYY'), 10),
      parseInt(moment(fecha, ['DD-MM-YYYY']).format('MM'), 10) - 1,
      parseInt(moment(fecha, ['DD-MM-YYYY']).format('DD'), 10),
      parseInt(moment(hora_fin, ['LT']).format('HH'), 10) - 4,
      parseInt(moment(hora_fin, ['LT']).format('mm'), 10),
      parseInt(moment(hora_fin, ['LT']).format('ss'), 10));
  }

  removerEvento(id) {
    const index = this.events.findIndex(x => x.id === id);
    this.events.splice(index, 1);
  }

  ObtenerIdBloque(id) {

  }

  addEvent(id, title, start, end) {
    this.events.push({
      id: id,
      title: title,
      start: new Date(parseInt(moment(start, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('YYYY'), 10),
        parseInt(moment(start, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('MM'), 10) - 1,
        parseInt(moment(start, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('DD'), 10),
        parseInt(moment(start, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('HH'), 10) + 4,
        parseInt(moment(start, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('mm'), 10),
        parseInt(moment(start, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('ss'), 10)),
      end: new Date(parseInt(moment(end, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('YYYY'), 10),
        parseInt(moment(end, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('MM'), 10) - 1,
        parseInt(moment(end, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('DD'), 10),
        parseInt(moment(end, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('HH'), 10) + 4,
        parseInt(moment(end, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('mm'), 10),
        parseInt(moment(end, ['YYYY-DD-MMTHH:mm:ss.SSSZ']).format('ss'), 10)),
      color: { primary: '#bf4959', secondary: '#d4838e' },
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false
      }
    });
    this.refresh.next();
    console.log(this.events, this.refresh.next());
  }

  comboActuacion() {
    this.disableDesc = false;
    this.disableDia = false;
    this.disableAct = true;
  }

  Cancelar() {
    if (this.cambio) {
      this.cambio = false;
      this.removerEvento(this.opcActividad);
    }
    this.disableAct = true;
    this.disableDesc = true;
    this.disableDia = true;
    this.disableServ = true;
    this.disableAbo = false;
    this.opcActividad = -1;
    this.opcDia = -1;
    this.opcHora = -1;
  }

  cargarEventosAgenda() {
    this.servi.getAll('agenda/misAgendasPendientes?revision=true').then((result: any) => {
      if (result.data.length > 0) {
        let act: any;
        result.data.forEach(element => {
          act = {
            id: element.id,
            title: element.descripcion,
            start: new Date(parseInt(moment(element.fechaActividad, ['DD-MM-YYYY']).format('YYYY'), 10),
              parseInt(moment(element.fechaActividad, ['DD-MM-YYYY']).format('MM'), 10) - 1,
              parseInt(moment(element.fechaActividad, ['DD-MM-YYYY']).format('DD'), 10),
              parseInt(moment(element.bloqueHorario.horaInicio, ['HH:mm:ss']).format('HH'), 10),
              parseInt(moment(element.bloqueHorario.horaInicio, ['HH:mm:ss']).format('mm'), 10),
              parseInt(moment(element.bloqueHorario.horaInicio, ['HH:mm:ss']).format('ss'), 10)),
            end: new Date(parseInt(moment(element.fechaActividad, ['DD-MM-YYYY']).format('YYYY'), 10),
              parseInt(moment(element.fechaActividad, ['DD-MM-YYYY']).format('MM'), 10) - 1,
              parseInt(moment(element.fechaActividad, ['DD-MM-YYYY']).format('DD'), 10),
              parseInt(moment(element.bloqueHorario.horaFinal, ['HH:mm:ss']).format('HH'), 10),
              parseInt(moment(element.bloqueHorario.horaFinal, ['HH:mm:ss']).format('mm'), 10),
              parseInt(moment(element.bloqueHorario.horaFinal, ['HH:mm:ss']).format('ss'), 10)),
            color: { primary: '#9bdec5', secondary: '#9bdec5' },
            draggable: false,
            resizable: {
              beforeStart: false,
              afterEnd: false
            }
          };
          this.events.push(act);
        });
        this.disableAct = false;
        this.disableAbo = true;
        this.refresh.next();
        console.log('get agenda');
      }
    }).catch((err) => {
      console.error(err);
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  cargarBloqueHorario() {
    this.servi.getAll('bloqueHorario').then((result: any) => {
      this.horas = result.data;
    }).catch((err: any) => {
      console.error(err);
    });
  }
  cargarActrividades() {
    this.servi.getAll('ordenServicio/' +  this.id + '/actividadesPorAgendar').then((result: any) => {
      this.actividades = result.data;
    }).catch((err: any) => {
      console.error(err);
    });
  }

  registrarActividadAgenda() {
    this.agendaForm.patchValue({ idUsuario: localStorage.getItem('id'), idOrdenServicio: this.id });
    if (this.agendaForm.valid) {
      this.agendaForm.patchValue({fechaActividad: moment(this.agendaForm.value.fechaActividad).format('DD-MM-YYYY')});
      this.servi.postFormData(this.agendaForm.value, 'agenda').then((result: any) => {
        if (result.status) {
          this.swa.okAlert('Actividad agendada con exito');
          this.cargarEventosAgenda();
          setTimeout( () => {
            this.router.navigate(['/agenda-servicio', {id: this.id }]);
          }, 2000);
        } else {
          this.swa.errorAlert('Error al agendar la actividad');
        }
      }).catch((err: any) => {
        console.error(err);
      });
    } else {
      this.swa.errorAlert('Verifique los campos');
    }
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`, { id: this.id }]);
  }

  ngOnDestroy() {
    // this.watcher.unsubscribe();
  }
}
