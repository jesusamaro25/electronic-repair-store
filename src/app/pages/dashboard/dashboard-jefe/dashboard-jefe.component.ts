import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServiceService } from '../../../Services/general-service.service';


@Component({
  selector: 'app-dashboard-jefe',
  templateUrl: './dashboard-jefe.component.html',
  styleUrls: ['./dashboard-jefe.component.css']
})


export class DashboardJefeComponent implements OnInit {


  resultado: any;

  total:number;

 
  reclamos = 23;
  calificaciones: number;
  usuarios = 4;

  constructor(private router: Router, public servicio: GeneralServiceService) 
  { 
    this.Cargar();
    this.CargarCalificacion()
  }
    

   Cargar(){

    this.servicio.getAll('solicitudServicio?estatus=NE').then((result) => {
      this.resultado = result;
      this.total= this.resultado.data.length;
      
    }, (err) => {
      console.log(err);
    });

  }

  CargarCalificacion(){

    this.servicio.getAll('ordenServicio/calificacionServicio').then((result) => {
      this.resultado = result;
      this.calificaciones= this.resultado.data.length;
      
    }, (err) => {
      console.log(err);
    });

  }

  ngOnInit() { }


  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
