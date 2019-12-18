
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import * as Chart from "chart.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-reporte-estadistico',
  templateUrl: './reporte-estadistico.component.html',
  styleUrls: ['./reporte-estadistico.component.css']
})

export class ReporteEstadisticoComponent implements OnInit {
    
    //Datos grafica
    pin: number=85
    pant: number=40;
    corn: number=35;
    cam: number=70;
    bot: number=70;
    plac: number=70;
    sist: number=40;


public pieChartOptions: ChartOptions = {
    legend: {
      position: 'right',
      labels: {
        fontSize: 20,
        fontColor: 'black'
      }
    },
    
  };

  public pieChartLabels: Label[] = ['Cambio de Conector', 'Cambio de Pantalla', 'Cambio de Corneta','Reparación de Camara', 'Sustitución de Botones', 'Cambio de Placa', 'Restauracion de sistema'];
  public pieChartData = [this.pin, this.pant, this.corn, this.cam, this.bot, this.plac, this.sist];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public colores = [ { backgroundColor: ['#1891ac', '#18aca0', '#1bc16e',
                                                  '#253B6D','#1f5f8b','#74c8db' ] }]                                      
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  tmes: any;
  tyear: any;
  mes: any = [];
  year: any = [];

    constructor() 
    { 
        this.year= [ 
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025"]
    }

    ngOnInit() {}



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
      	doc.text(30, 25, 'Servicios con mayores ingresos')
     	  var img = new Image();
      	img.src = "../../../../../../assets/images/logo-icon.jpg"
      	doc.addImage(img, 'PNG', 0,3,30,30)
      	doc.addImage(img, 'PNG', 180,3,30,30)
      	doc.save("Reporte.pdf")
    	});
     }



}