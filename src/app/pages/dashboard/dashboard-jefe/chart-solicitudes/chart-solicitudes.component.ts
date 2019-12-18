import { Component, OnInit, ViewChild } from '@angular/core';
import { monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend, Label, SingleDataSet,Colors, MultiDataSet, BaseChartDirective} from 'ng2-charts' 
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import { DatePipe } from '@angular/common';


@Component
({
  selector: 'app-chart-solicitudes',
  templateUrl: './chart-solicitudes.component.html',
  styleUrls: ['./chart-solicitudes.component.css']
})


export class ChartSolicitudesComponent implements OnInit 
{
  //Grafico circular de solicitudes

  public pieChartLabels: Label[] = [['Aprobadas'], ['Pendientes'], ['Rechazadas']];

      aprobadas: number
      rechazadas: number;
      pendientes: number;

  public pieChartData: 
    SingleDataSet = [this.aprobadas, this.pendientes, this.rechazadas];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
  public colores: Colors[]= [ { backgroundColor: ['#1891ac', '#18aca0', '#1bc16e',
                                                  '#253B6D','#1f5f8b' ] }]

  public pieChartOptions:
    ChartOptions =
    { 
      responsive: true,

      legend: 
        {
            labels: {fontColor: 'black'}
        },
    };



  //Grafico anillo de servicios demandados

  public doughnutChartLabels: 
    Label[] = 
      [['Sustitución de Pantalla'], ['Sustitución de Conectores'], ['Reparación de Placa']];

        pant: number=40;
        conec: number=35;
        placa: number=70;

  public doughnutChartData: 
    SingleDataSet = [this.pant, this.conec, this.placa];
  
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartPlugins = [];

  public doughnutChartOptions:
    ChartOptions =
    { 
      responsive: true,

      legend: 
        {
            labels: {fontColor: 'black'}
        },
    };

  
  resultado: any;


  constructor(public servi: GeneralServiceService,private datePipe: DatePipe) 
    { 
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
      this.Cargar1()
    }

  ngOnInit() 
    {}





  // Eventos
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void 
    {console.log(event, active);}

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void 
    {console.log(event, active);}


    Cargar1(){
  
        let string="solicitudServicio"
  
        this.servi.getAll(string).then((result) => {
          this.resultado = result;
          this.aprobadas=0
          this.rechazadas=0
          this.pendientes=0

          let array_data=[0,0,0]

          for (let i = 0; i < this.resultado.data.length; i++) {

            if(this.resultado.data[i].estatus=="A"){
              this.aprobadas+=1
            }
            if(this.resultado.data[i].estatus=="R"){
              this.rechazadas+=1
            }
            if(this.resultado.data[i].estatus=="E"){
              this.pendientes+=1
            }

          }

          this.pieChartData=[this.aprobadas,this.pendientes,this.rechazadas]

        }, (err) => {
          console.log(err);
        });
        
    }

    getColor(){

      var letters = "0123456789ABCDEF"; 
      // html color code starts with # 
      var color = '#'; 
  
      // generating 6 times as HTML color code consist 
      // of 6 letter or digits 
      for (var i = 0; i < 6; i++) {
        color += letters[(Math.floor(Math.random() * 16))]; 
      }
      return color
    }

}


