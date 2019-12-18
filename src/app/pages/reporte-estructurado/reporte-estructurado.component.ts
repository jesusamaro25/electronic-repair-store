import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';


@Component({
  selector: 'app-reporte-estructurado',
  templateUrl: './reporte-estructurado.component.html',
  styleUrls: ['./reporte-estructurado.component.css']
})


export class ReporteEstructuradoComponent implements OnInit { 

  tcategoria: any;
  categoria: any = [];
  testado: any;
  estado: any = [];
  ttipo: any;
  tipo: any = [];

  displayedColumns: string[] = ['position', 'Servicio', 'Categoria', 'Estado', 'Fecha'];
  dataSource = new MatTableDataSource<Solicitudes>(solicitudServicio);

  @ViewChild(MatPaginator) paginator: MatPaginator;

   constructor() 
    { 
        this.estado= [ 
          "Todas",
          "Aprobada",
          "En espera",
          "Rechazada"]

        this.categoria= [
          "Todas",
          "Linea Blanca",
          "Telefonía",
          "Computación",
          "Audio y Video"]

          this.tipo= [
          "Smartphone",
          "Consola"]
    }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        doc.text(30, 25, 'Servicios con mayores ingresos')
        var img = new Image();
        img.src = "../../../../../../assets/images/logo-icon.jpg"
        doc.addImage(img, 'PNG', 0,3,30,30)
        doc.addImage(img, 'PNG', 180,3,30,30)
        doc.save("Reporte.pdf")
      });
     }
   
}

export interface Solicitudes {
  Servicio: string;
  position: number;
  Estado: string;
  Fecha: string;
  Categoria: string;
}

const solicitudServicio: Solicitudes[] = [
  {position: 1, Servicio: 'Reparación de Consola', Categoria:'Videojuegos', Estado: 'Aprobada', Fecha: '17/05/2019'},
  {position: 2, Servicio: 'Mantenimiento de computadora', Categoria:'Computación', Estado: 'En espera', Fecha: '19/09/2019'},
  {position: 3, Servicio: 'Reparación de smartphone', Categoria:'Telefonía', Estado: 'Rechazada', Fecha: '10/10/2019'},
  {position: 4, Servicio: 'Reparación de', Categoria:'Linea Blanca', Estado: 'Aprobada', Fecha: '08/10/2019'},
  {position: 5, Servicio: 'Reparación de Computadora', Categoria:'Computación', Estado: 'En espera', Fecha: '15/01/2018'},
  {position: 6, Servicio: 'Mantenimiento de smartphone', Categoria:'Telefonía', Estado: 'Rechazada', Fecha: '14/02/2019'},
  {position: 7, Servicio: 'Reparación de computadora', Categoria:'Computación', Estado: 'En espera', Fecha: '18/05/2018'},
  {position: 8, Servicio: 'Reparación de smartphone', Categoria:'Telefonía', Estado: 'Rechazada', Fecha: '04/07/2017'},
  {position: 9, Servicio: 'Mantenimiento de...', Categoria:'Linea Blanca', Estado: 'Aprobada', Fecha: '12/08/2019'},
  {position: 10, Servicio: 'Mantenimiento de...', Categoria:'Linea Blanca', Estado: 'Aprobada', Fecha: '26/01/2019'},
  {position: 11, Servicio: 'Mantenimiento de...', Categoria:'Linea Blanca', Estado: 'Aprobada', Fecha: '10/03/2019'},
  {position: 12, Servicio: 'Mantenimiento de...', Categoria:'Linea Blanca', Estado: 'Aprobada', Fecha: '04/10/2019'},
  {position: 13, Servicio: 'Mantenimiento de...', Categoria:'Linea Blanca', Estado: 'Aprobada', Fecha: '04/09/2019'},
  
];
