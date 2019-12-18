import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import * as Chart from "chart.js";
import * as moment from 'moment';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { GeneralServiceService } from '../../../Services/general-service.service';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


let solicitudServicio: any[] = [];
@Component({
  selector: 'app-reporte-estadistico-ingresos',
  templateUrl: './reporte-estadistico-ingresos.component.html',
  styleUrls: ['./reporte-estadistico-ingresos.component.css']
})

export class ReporteEstadisticoIngresosComponent implements OnInit {
  
  //Filtros
  mes: any = [];
  year: any = [];
  tipos: any = [];

  total: number
  valor: number

  inicioControl = new FormControl('', [
    Validators.required
  ]);

  finControl = new FormControl('', [
    Validators.required
  ]);

  tipoControl = new FormControl('', [
    Validators.required
  ]);


  //Tabla
  displayedColumns: string[] = ['position', 'Servicio', 'Cantidad'];
  dataSource = new MatTableDataSource<Solicitudes>(solicitudServicio);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  //Grafica
  public pieChartLabels: 
    Label[] = [];
      
      pin: number=30;
      pant: number=25;
      corn: number=20;
      cam: number=15;
      bot: number=10;

  public pieChartData :
    number[]=[];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public colores = [ { 
    backgroundColor: [
    ] 
  }]


 public pieChartOptions:
    ChartOptions =
    { 
      responsive: true,

      legend: 
        {
            position: 'right',
            labels: {fontColor: 'black', fontSize: 16}
        },
    };
  resultado: any;
  datos: any;


  constructor(public servi: GeneralServiceService,private datePipe: DatePipe) 
    { 
      this.cargarTipos()
    }

    ngOnInit() {
     this.dataSource.paginator = this.paginator;
    }


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
      	doc.text(40, 25, 'Estadistica De Servicios')
     	  var img = new Image();
      	img.src = "../../../../../../assets/images/Smartech_2.png"
      	doc.addImage(img, 'PNG', 8,8,30,30)
      	//doc.addImage(img, 'PNG', 180,3,30,30)
      	doc.save("Reporte.pdf")
    	});
     }

    cargarTipos(){
      this.tipos=[];
      this.servi.getAll('tipoServicio').then((result) => {
        this.resultado = result;
        this.tipos=this.resultado.data;
      }, (err) => {
        console.log(err);
      }); 
  
    }

    CargarTabla(){

      if(this.inicioControl.valid && this.finControl.valid){
  
        let inicio=this.datePipe.transform(this.inicioControl.value, 'dd-MM-yyyy');
        let fin=this.datePipe.transform(this.finControl.value, 'dd-MM-yyyy');
        let string="reporte/estadisticoSolicitud?fechaDesde="+inicio+"&fechaHasta="+fin;
  
        if(this.tipoControl.valid && this.tipoControl.value!="T"){
          string+="&idTipoServicio="+this.tipoControl.value.id
        }
  
        this.servi.getAll(string).then((result) => {
          this.resultado = result;
          solicitudServicio = [];
          this.total=0
          for (let i = 0; i < this.resultado.data.length; i++) {
            this.datos = {
              position: i+1,
              Servicio: this.resultado.data[i].descripcion,
              Cantidad: this.resultado.data[i].solicitudes
            };
            solicitudServicio.push(this.datos);
            this.total+=parseInt(this.resultado.data[i].solicitudes)
          }
          let array_data=[]
          let array_name=[]
          let array_color=[]
          for (let i = 0; i < solicitudServicio.length; i++) {

            this.valor=Math.round(solicitudServicio[i].Cantidad*100/this.total)
            array_data.push(this.valor)
            array_name.push("%"+solicitudServicio[i].Servicio)
            array_color.push(this.getColor())

          }

          this.pieChartLabels=array_name
          this.pieChartData=array_data
          this.colores=[ { 
            backgroundColor:array_color
          }]

          this.dataSource = new MatTableDataSource(solicitudServicio);
          this.dataSource.paginator = this.paginator;
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
  Servicio: string;
  position: number;
  Cantidad: number;
}

const solicitudServicio2: Solicitudes[] = [
  {position: 1, Servicio: 'Reparación', Cantidad:100},
  {position: 2, Servicio: 'Mantenimiento', Cantidad:90},
  {position: 3, Servicio: 'Reparación', Cantidad:80},
  {position: 4, Servicio: 'Reparación', Cantidad:70},
  {position: 5, Servicio: 'Reparación', Cantidad:60},
  {position: 6, Servicio: 'Mantenimiento', Cantidad:50},
  {position: 7, Servicio: 'Reparación', Cantidad:40},
];




  //public pieChartOptions: 
  //ChartOptions = 
  //{
    //responsive: true,
    
    //legend: {
      //position: 'right',
      //labels: {
       // fontSize: 14,
       // fontColor: '#000000',
       // fontStyle: '500'
     // }
    //  },
   //   plugins: {
   //   datalabels: {
  //      formatter: (value, ctx) => {
  //        const label = ctx.chart.data.labels[ctx.dataIndex];
  //        return label;
  //      },
  //    },
 //   },
 // };