import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import * as Chart from "chart.js";
import * as moment from 'moment';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte-estadistico-servicios',
  templateUrl: './reporte-estadistico-servicios.component.html',
  styleUrls: ['./reporte-estadistico-servicios.component.css']
})


export class ReporteEstadisticoServiciosComponent implements OnInit {

    //Filtros
    mes: any = [];
    year: any = [];

    //Tabla
    displayedColumns: string[] = ['Mes', 'Cantidad'];
    dataSource = new MatTableDataSource<Solicitudes>(solicitudTecnico);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    //Grafica
    public barChartLegend = true;

  	public barChartLabels: 
      Label[] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre', 'OCtubre', 'Noviembre','Diciembre'];
  
  	public barChartType: 
      ChartType = 'bar';

    public barChartData: 
    ChartDataSets[] = 
    [
        { data: [65, 59, 40, 31, 26], 
          label: 'Línea Blanca',
          backgroundColor:'#18aca0',
          stack: 'a' },
        { data: [68, 58, 40, 39, 26],
          label: 'Audio y Video',
          backgroundColor:'#74c8db',
          stack: 'a' },
          { data: [65, 50, 48, 34, 20],
          label: 'Computación',
          backgroundColor:'#d1d1d1',
          stack: 'a' },
        { data: [70, 58, 40, 39, 26],
          label: 'Telefonía',
          backgroundColor:'#1bc16e',
          stack: 'a' }
    ];

    public barChartOptions: 
      ChartOptions = 
      {
        responsive: true,

        scales: 
          { xAxes: 
            [{ticks: {fontSize:14, fontColor:'#000000', fontStyle:'500'}}], 
            yAxes:
            [{ticks: {fontSize:14, fontColor:'#000000', fontStyle:'500'}}] 
          },
        legend: 
          {
            position: 'right',
            labels: {fontColor: '#000000', fontSize: 14}
          },

      };


  	constructor() 
    { 
      this.year= [ 
          "2017",
          "2018",
          "2019"]

      this.mes= [ 
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"]
    }

  	ngOnInit() {
      this.dataSource.paginator = this.paginator;
    }

  	//Eventos
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void 
    {console.log(event, active);}

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void 
    {console.log(event, active);}



    //PDF
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
        doc.text(50, 25, 'Servicios prestados en el año')
        var img = new Image();
        img.src = "../../../../../../assets/images/logo-icon.jpg"
        doc.addImage(img, 'PNG', 8,8,30,30)
        //doc.addImage(img, 'PNG', 180,3,30,30)
        doc.save("Reporte.pdf")
      });
     }

}

export interface Solicitudes {
  Mes: string;
  Cantidad: number;
}

const solicitudTecnico: Solicitudes[] = [
  {Mes: 'Enero', Cantidad:100},
  {Mes: 'Febrero', Cantidad:90},
  {Mes: 'Marzo', Cantidad:80},
  {Mes: 'Abril', Cantidad:70},
  {Mes: 'Mayo', Cantidad:60},
];