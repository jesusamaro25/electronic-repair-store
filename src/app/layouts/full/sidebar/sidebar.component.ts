import {
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { funciones } from '../../../../assets/funciones';
import { GeneralServiceService } from '../../../Services/general-service.service';

let permisos: any[] = [];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  user: any;

  private _mobileQueryListener: () => void;
  resultado: any;
  darray: { id: any; nombre: any; };
  permi={};

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,fun: funciones,
    public servicio: GeneralServiceService
  ) {
    this.user=fun.getLocal();
    console.log(this.user);
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    if(this.user.rol.tipo!='cliente'){
      this.getPermisos();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  getPermisos(){

    this.servicio.getAll('rol/'+this.user.rol.id+'/permisos').then(async (result) => {
      this.resultado = result;
      permisos = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.darray = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre
        };
        permisos.push(this.darray);
      }

      permisos.forEach(item => this.permi[item.nombre] = true);
      console.log(this.permi);

    }, (err) => {
      console.log(err);
    });

  }



}

