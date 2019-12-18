import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { GeneralServiceService } from '../../Services/general-service.service';
import { ModalNotificacionesComponent } from './notificaciones-modal/notifiaciones-modal.component';
import { MatDialog } from '@angular/material/dialog';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit, OnInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  notiTodas = [];
  notificaciones = [];
  notiSinLeer: any;
  otras: number;
  animal: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private serv: GeneralServiceService,
    public dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalNotificacionesComponent, {
      width: '580px',
      height: '480px',
      data: this.notiTodas
    });
  }

  ngOnInit(): void {
    this.cargarNotificaciones();
    this.notificacionesSinleer();
  }

  private notificacionesSinleer() {
    this.serv.getAll('notificacion/noleidas').then((resp: any) => {
      this.notiSinLeer = resp.data.count;
    }).catch((error) => {
      console.error(error);
    });
  }

  private cargarNotificaciones() {
    this.serv.getAll('notificacion').then((resp: any) => {
      this.notiTodas = resp.data;
      this.notificaciones = resp.data.slice(0, 4);
      this.otras = (this.notiTodas.length - this.notificaciones.length);
    }).catch((error) => {
      console.error(error);
    });
  }

  public leerNotificaciones() {
    this.serv.postFormData([{}], 'notificacion/leer').then((resp: any) => {
      this.cargarNotificaciones();
      this.notificacionesSinleer();
      console.log(resp);
    }).catch((error) => {
      console.error(error);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() { }


}
