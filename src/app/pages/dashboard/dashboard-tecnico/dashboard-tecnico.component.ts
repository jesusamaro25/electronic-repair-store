import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend, Label, SingleDataSet,Colors, MultiDataSet, BaseChartDirective} from 'ng2-charts' 
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GeneralServiceService } from '../../../Services/general-service.service';

@Component({
  selector: 'app-dashboard-tecnico',
  templateUrl: './dashboard-tecnico.component.html',
  styleUrls: ['./dashboard-tecnico.component.css'],

})

export class DashboardTecnicoComponent implements OnInit {

    tareas = 13;
    servicios = 10;
    incidencias = 2;

    resultado: any;
    totaltar: number;
    totalser: number;
    totalinc: number;

    constructor(private router: Router, config: NgbCarouselConfig,  public service: GeneralServiceService) 
    {
      config.interval = 10000;
      config.wrap = false;
      config.keyboard = false;
      config.pauseOnHover = false;
    }

    ngOnInit() 
    {
      this.cargarTareas();
      this.cargarServicios();
      this.cargarIncidencias()
    }

    cargarIncidencias(){
      this.service.getAll('empleado/incidencias').then((result) => {
        this.resultado = result;
        this.totalinc = this.resultado.data.length;

      }, (err) => {
        console.log(err);
      });
    }


    cargarTareas()
    {

     this.service.getAll('agenda/misAgendasPendientes').then((result: any) => {
      this.resultado = result;
      this.totaltar= this.resultado.data.length;
      
      }, (err) => {
        console.log(err);
      });
    }

    cargarServicios()
    {

     this.service.getAll('ordenServicio/enReparacion').then((result) => {
      this.resultado = result;
      this.totalser= this.resultado.data.length;
      
      }, (err) => {
        console.log(err);
      });
    }




  //Barras-Tipo de Servicios
    public barChartLabels: Label[] = ['Enero', 'Febrero','Marzo', 'Abril','Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    public barChartType: ChartType = 'bar';

    public barChartLegend = true;

    public barChartData: 
      ChartDataSets[] = 
      [ { data: [18,15,11,12,8,12,12,2,18,9,3,12,0], 
          label: 'Revisiones',
          backgroundColor:'#1891ac'},
        { data: [6,10,10,15,14,10,14,12,1,11,13,14,0], 
          label:'Mantenimientos',
          backgroundColor:'#18aca0'},
        { data: [4,5,9,3,15,8,12,16,1,10,14,4,0],
          label: 'Reparaciones',
          backgroundColor:'#1bc16e' }, 
      ];

    public barChartOptions: 
      ChartOptions = 
      {
        responsive: true,

        scales: 
          { xAxes: [{ticks: {fontSize: 12, fontColor: '#000', fontStyle: '500'}}], 
            yAxes: [{ticks: {fontSize: 12, fontColor: '#000', fontStyle: '500'}}] },
        
        legend: 
          {
            labels: {fontColor: 'black'}
          },

        plugins: 
          {
            datalabels: {anchor: 'end', align: 'end',}
          }
      };

    
  

    goToPage(pageName: string) {this.router.navigate([`${pageName}`]);}

 
    //Eventos
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void 
    {console.log(event, active);}

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void 
    {console.log(event, active);}

}




