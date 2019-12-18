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
  selector: 'app-reporte-estructurado-reclamo',
  templateUrl: './reporte-estructurado-reclamo.component.html',
  styleUrls: ['./reporte-estructurado-reclamo.component.css']
})
export class ReporteEstructuradoReclamoComponent implements OnInit {

  tcategoria: any;
  categoria: any = [];
  ttipoe: any;
  tipoe: any = [];
  ttipo: any;
  tipo: any = [];
  testado: any;
  estado: any = [];

  displayedColumns: string[] = ['position', 'Servicio', 'Tipo', 'Estado', 'Fecha', 'Categoria', 'TipoE'];
  dataSource = new MatTableDataSource<Reclamos>(solicitudReclamos);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { 

    this.categoria= [
      "Todas",
      "Linea Blanca",
      "Telefonía",
      "Computación",
      "Audio y Video"]

      this.tipoe= [
          "Todos",
          "Smartphone",
          "Consola"]

      this.tipo= [
      "Todas",
      "Fallas",
      "Retraso de entrega"]

      this.estado= [
      "Todos",
      "Rechazo",
      "En espera"]


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
      doc.text(30, 25, 'Servicios con reclamos mas frecuentes')
      var img = new Image();
      img.src = "../../../../../../assets/images/logo-icon.jpg"
      doc.addImage(img, 'PNG', 0,3,30,30)
      doc.addImage(img, 'PNG', 180,3,30,30)
      doc.save("Reporte.pdf")
    });
   }
 
}
export interface Reclamos {
  position: number;
  Servicio: string;
  Tipo: string;
  Estado: string;
  Fecha: string;
  Categoria: string;
  TipoE: string;
}

const solicitudReclamos: Reclamos[] = [
  {position: 1, Servicio: 'Reparacion placa smartpone', Tipo: 'Fallas', Estado: 'Rechazado', Fecha: '20/05/2019', Categoria:'Telefonia', TipoE: 'Smatphone'},
  {position: 2, Servicio: 'Reparacion placa smartpone', Tipo: 'Fallas', Estado: 'Rechazado', Fecha: '20/05/2019', Categoria:'Telefonia', TipoE: 'Smatphone'},
  {position: 3, Servicio: 'Reparacion placa smartpone', Tipo: 'Fallas', Estado: 'Rechazado', Fecha: '20/05/2019', Categoria:'Telefonia', TipoE: 'Smatphone'},
  {position: 4, Servicio: 'Reparacion placa smartpone', Tipo: 'Fallas', Estado: 'Rechazado', Fecha: '20/05/2019', Categoria:'Telefonia', TipoE: 'Smatphone'},
  {position: 5, Servicio: 'Reparacion placa smartpone', Tipo: 'Fallas', Estado: 'Rechazado', Fecha: '20/05/2019', Categoria:'Telefonia', TipoE: 'Smatphone'},
  
  
];
