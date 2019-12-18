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
import { GeneralServiceService } from '../../../Services/general-service.service';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


let solicitudTecnico: any[] = [];
@Component({
  selector: 'app-reporte-estadistico-tecnicos',
  templateUrl: './reporte-estadistico-tecnicos.component.html',
  styleUrls: ['./reporte-estadistico-tecnicos.component.css']
})


export class ReporteEstadisticoTecnicosComponent implements OnInit {

    //Filtros
    mes: any = [];
    year: any = [];

    //Tabla
    displayedColumns: string[] = ['position', 'Tecnico', 'Cantidad'];
    dataSource = new MatTableDataSource<Solicitudes>(solicitudTecnico);

    inicioControl = new FormControl('', [
      Validators.required
    ]);
  
    finControl = new FormControl('', [
      Validators.required
    ]);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    //Grafica
    public barChartLegend = true;

  	public barChartLabels: 
      Label[] = [];
  
  	public barChartType: 
      ChartType = 'horizontalBar';

    public barChartData: 
    ChartDataSets[] = 
    [
        { data: [], 
          label: '',
          backgroundColor:'',
          stack: '' }
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
  resultado: any;
  resultado2: any;
  total: number;
  tecnico: any;
  categoria: any;
  datos: any;


  	constructor(public servi: GeneralServiceService,private datePipe: DatePipe) 
    {  }

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
        doc.text(50, 25, 'Servicios Por Tecnico')
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
        let string="reporte/estadisticoTecnico?fechaDesde="+inicio+"&fechaHasta="+fin;
        let string2="reporte/estadisticoTecnico2?fechaDesde="+inicio+"&fechaHasta="+fin;

        let array_name=[]
        let array_temp=[]
        let array_cate=[]

        //cargar tabla
        this.servi.getAll(string).then((result) => {
          this.resultado = result;
          solicitudTecnico = [];
          
          for (let i = 0; i < this.resultado.data.length; i++) {
            this.total=0
            this.tecnico=this.resultado.data[i]
            
            array_name.push(this.tecnico.nombre+" "+this.tecnico.apellido)
            array_temp.push(0)

            for (let j = 0; j < this.tecnico.trabajos.length; j++){

              this.total+=parseInt(this.tecnico.trabajos[j].cantidadTrabajo)

            }

            this.datos = {
              position: i+1,
              Tecnico: this.tecnico.nombre+" "+this.tecnico.apellido,
              Cantidad: this.total
            };

            solicitudTecnico.push(this.datos);

          }
          console.log(array_name)

          this.barChartLabels=array_name
          this.dataSource = new MatTableDataSource(solicitudTecnico);
          this.dataSource.paginator = this.paginator;

          

          //cargar chart
          this.servi.getAll(string2).then((result) => {
            this.resultado2 = result;
            for (let k = 0; k < this.resultado2.data.length; k++) {
              
              this.categoria=this.resultado2.data[k]

              let array_number=[]

              for (let l = 0; l < this.categoria.tecnicos.length; l++){


                console.log(this.categoria.tecnicos[l].nombre+" "+this.categoria.tecnicos[l].apellido+" Se Ubica en")
                console.log(array_name.indexOf(this.categoria.tecnicos[l].nombre+" "+this.categoria.tecnicos[l].apellido))

                let index=array_name.indexOf(this.categoria.tecnicos[l].nombre+" "+this.categoria.tecnicos[l].apellido)
                array_number[index]=this.categoria.tecnicos[l].cantidadTrabajo

              }

              let json={
                data: array_number, 
                label: this.categoria.nombreCategoria,
                backgroundColor: this.getColor(),
                stack: 'a'
              }

              array_cate.push(json)

            }

            this.barChartData=array_cate
            this.dataSource = new MatTableDataSource(solicitudTecnico);
            this.dataSource.paginator = this.paginator;
          }, (err) => {
            console.log(err);
          });



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
  Tecnico: string;
  position: number;
  Cantidad: number;
}

const solicitudTecnico2: Solicitudes[] = [
  {position: 1, Tecnico: 'Katherine', Cantidad:100},
  {position: 2, Tecnico: 'Karen', Cantidad:90},
  {position: 3, Tecnico: 'Anyeli', Cantidad:80},
  {position: 4, Tecnico: 'Maria', Cantidad:70},
  {position: 5, Tecnico: 'Jose', Cantidad:60},
];