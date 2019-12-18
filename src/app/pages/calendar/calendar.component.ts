import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarDayViewComponent,
  CalendarWeekViewComponent
} from 'angular-calendar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { GeneralServiceService } from '../../Services/general-service.service';
import * as moment from 'moment';
const colors: any = {
  red: {
    primary: '#bf4959',
    secondary: '#d4838e'
  },
  blue: {
    primary: '#fec10b',
    secondary: '#fecb32'
  },
  yellow: {
    primary: '#cd9d12',
    secondary: '#eec140'
  }
};


interface Calendarconfig {
  StartHour: number;
  EndHour: number;
  // StartDay: Date;
  // EndDay: Date;
}
type CalendarPeriod = 'day' | 'week';

@Component({
  templateUrl: 'modal.html'
})
export class ModalView {
  constructor(
    public dialogRef: MatDialogRef<ModalView>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  modalDiag: any;
  resultado: any;
  opcionTecnico = '0';
  model: NgbDateStruct;
  date: { year: number, month: number };

  view: CalendarPeriod = 'week';

  CalendarView = CalendarView;

  hora: string;
  minuto: string;
  tiempo: string;

  StartHour = 7;
  EndHour = 18;

  dt: Date = new Date();

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  locale = 'es';

  activeDayIsOpen = true;
  activeMediaQuery = '';

  watcher: Subscription;
  constructor(public servi: GeneralServiceService,
    public modal: MatDialog,
    private calendar: NgbCalendar,
    public media: ObservableMedia) {
  }

  ngOnInit(): void {
    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if (change.mqAlias === 'md') {
        this.view = CalendarView.Week;
      }
      console.log(this.activeMediaQuery);
    });
    this.cargarEventosAgenda();
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  // dayView() {
  //   this.media.asObservable()
  //     .subscribe((change: MediaChange) => {
  //       this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
  //   });
  //   console.log(this.state);
  //   if (this.media.asObservable().subscribe('sm')) {
  //     this.view = this.CalendarView.Day;
  //   }
  // }

  cal_hora(fecha: Date) {
    if (fecha.getHours() < 10) {
      this.hora = '0' + fecha.getHours().toString();
      this.tiempo = 'a.m';
    } else if (fecha.getHours() > 12) {
      this.hora = '0' + (fecha.getHours() - 12).toString();
      this.tiempo = 'p.m';
    } else {
      this.hora = fecha.getHours().toString();
    }
    if (fecha.getMinutes() < 10) {
      this.minuto = '0' + fecha.getMinutes().toString();
    } else {
      this.minuto = fecha.getMinutes().toString();
    }
    return this.hora + ':' + this.minuto;
  }
  n_cita(fecha: Date): void {
    // this.modal.open(CitaView, {
    // width: '65%',
    // data: {
    // hora: this.cal_hora(fecha),
    // tiempo: this.tiempo
    // }
    // });
  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.servi.getAll('agenda/' + event.id).then((result: any) => {
      this.modalDiag = this.modal.open(ModalView, {
        width: '50%',
        data: result.data
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
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
        this.refresh.next();
        console.log('get agenda');
      }
    }).catch((err) => {
      console.error(err);
    });
  }
  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
}
