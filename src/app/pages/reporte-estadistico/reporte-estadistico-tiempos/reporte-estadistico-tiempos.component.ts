import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import * as Chart from "chart.js";
import { Validators, FormControl } from '@angular/forms';
import { GeneralServiceService } from '../../../Services/general-service.service';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

let solicitudTecnico: any[] = [];
@Component({
  selector: 'app-reporte-estadistico-tiempos',
  templateUrl: './reporte-estadistico-tiempos.component.html',
  styleUrls: ['./reporte-estadistico-tiempos.component.css']
})
export class ReporteEstadisticoTiemposComponent implements OnInit {

  categorias: any = [];

  //Tabla
    displayedColumns: string[] = ['Tiempo', 'Dias'];
    dataSource = new MatTableDataSource<Solicitudes>(solicitudTecnico);

    inicioControl = new FormControl('', [
      Validators.required
    ]);
  
    finControl = new FormControl('', [
      Validators.required
    ]);
  
    cateControl = new FormControl('', [
      Validators.required
    ]);


   public barChartOptions: ChartOptions = 
   {
    responsive: true,
    scales: { xAxes: [{ticks: {fontSize: 14, fontColor: '#000000', fontStyle: '500'}}], yAxes: [{ticks: {fontSize: 14, fontColor: '#000000', fontStyle: '500'}}] },

    legend: 
          {
            labels: {fontColor: '#000000', fontSize: 14}
          },


    plugins: 
    {
      datalabels: 
      {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['Responder Solicitud', 'Realizar Revisión', 'Realizar Reparación'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Tiempo Promedio', backgroundColor: ''}
  ];
  resultado: any;
  datos: any;

  constructor(public servi: GeneralServiceService,private datePipe: DatePipe) {
    this.cargarCategorias()
   }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  cargarCategorias(){
    this.categorias=[];
    this.servi.getAll('categoriaTipoEquipo').then((result) => {
      this.resultado = result;
      this.categorias=this.resultado.data;
    }, (err) => {
      console.log(err);
    }); 

  }

  downloadImagePDF()
    {
      var doc = new jspdf()
      var data = document.getElementById('content');
      html2canvas(data).then(canvas => {
        // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        //pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        doc.addImage(contentDataURL, 'PNG', 0, 40, imgWidth, imgHeight)
        doc.setFontSize(30)
        doc.text(50, 25, 'Tiempos Promedio')
        var img = new Image();
        img.src = "../../../../../../assets/images/Smartech_2.png"
        doc.addImage(img, 'PNG', 8,8,30,30)
        //doc.addImage(img, 'PNG', 180,3,30,30)
        doc.save("Reporte.pdf")
      });
     }

     CargarTabla(){

      if(this.inicioControl.valid && this.finControl.valid){
  
        let inicio=this.datePipe.transform(this.inicioControl.value, 'dd-MM-yyyy');
        let fin=this.datePipe.transform(this.finControl.value, 'dd-MM-yyyy');
        let string="reporte/estadisticoTiempoProm?fechaDesde="+inicio+"&fechaHasta="+fin;
  
        if(this.cateControl.valid && this.cateControl.value!="T"){
          string+="&idCategoriaTipoEquipo="+this.cateControl.value.id
        }
  
        this.servi.getAll(string).then((result) => {
          this.resultado = result;
          solicitudTecnico = [];
          let array_number=[]
          for (let i = 0; i <3; i++) {

            if(i==0){
              this.datos = {
                Tiempo: "Responder Solicitud",
                Dias: Math.round(parseFloat(this.resultado.data.segundosSol)/3600)
              };
            }
            if(i==1){
              this.datos = {
                Tiempo: "Realizar Revision",
                Dias: Math.round(parseFloat(this.resultado.data.segundosRev)/3600)
              };
            }
            if(i==2){
              this.datos = {
                Tiempo: "Realizar Reparacion",
                Dias: Math.round(parseFloat(this.resultado.data.segundosRep)/3600)
              };
            }

            array_number.push(this.datos.Dias)
            solicitudTecnico.push(this.datos);
          }
          
          const json={
            data: array_number,
            label: 'Tiempo Promedio',
            backgroundColor: this.getColor()
          }

          this.barChartData=[json]

          this.dataSource = new MatTableDataSource(solicitudTecnico);
        }, (err) => {
          console.log(err);
        });
        
        
      }
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

  export interface Solicitudes {
  Tiempo: string;
  Dias: number;
  }

const solicitudTecnico2: Solicitudes[] = [
  {Tiempo: 'Respuesta Solicitud', Dias:2},
  {Tiempo: 'Revisión', Dias:3},
  {Tiempo: 'Reparación', Dias:4}
];
