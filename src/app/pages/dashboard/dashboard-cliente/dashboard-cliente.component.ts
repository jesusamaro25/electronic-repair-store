import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgbCarousel, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { GeneralServiceService } from '../../../Services/general-service.service';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrls: ['./dashboard-cliente.component.css'],
  providers: [NgbCarouselConfig]
})


export class DashboardClienteComponent implements OnInit {

  //Card de Mis SOlicitudes
  s_apro:number;
  s_esper: number;
  s_recha: number;

 //Card de Mis Reclamos
  r_aprob=4;
  r_esper=5;
  r_recha=6;
 

  promociones: any[] =  [];
  resultado: any;
  datos: any;
  totalpres: number;
  totaleq: number;
  totalsol: number;


  constructor(private router: Router, config: NgbCarouselConfig,public service: GeneralServiceService) { 
    config.showNavigationIndicators = false;
    config.interval = 3000;
  }

  ngOnInit() {
    this.cargarPromociones();
    this.cargarPresupuestos();
    this.cargarEquipos();
    this.cargarSolicitudes();
   
  }

  cargarPromociones(){

    this.service.getAll('promocion/vigente').then((result) => {
      this.resultado = result;
      this.promociones = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre,
          imagen: this.resultado.data[i].urlImagen,
          cartalogoServicio: this.resultado.data[i].catalogoServicio
        };
        this.promociones.push(this.datos);
      }
    }, (err) => {
      console.log(err);
    });

  }


  cargarPresupuestos(){

     this.service.getAll('solicitudServicio/presupuestoCliente').then((result) => {
      this.resultado = result;
      this.totalpres= this.resultado.data.length;
      
    }, (err) => {
      console.log(err);
    });
  }


  cargarEquipos(){

     this.service.getAll('ordenServicio/enReparacion').then((result) => {
      this.resultado = result;
      this.totaleq= this.resultado.data.length;
      
    }, (err) => {
      console.log(err);
    });

  }


  cargarSolicitudes(){

     this.service.getAll('solicitudServicio/cliente').then((result) => {
      this.resultado = result;
      this.totalsol= this.resultado.data.length;

      this.s_apro=0
      this.s_esper=0
      this.s_recha=0

      for (let i = 0; i < this.resultado.data.length; i++) {

        if(this.resultado.data[i].estatus=="A"){
          this.s_apro+=1
        }
        if(this.resultado.data[i].estatus=="R"){
          this.s_recha+=1
        }
        if(this.resultado.data[i].estatus=="E"){
          this.s_esper+=1
        }

      }


      
    }, (err) => {
      console.log(err);
    });

  }




  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  goToProm(param: any) {
    console.log(param)
    this.router.navigate(['/solicitar-servicio', { idProm: param.id, idServi: param.cartalogoServicio.id}]);
  }

}
