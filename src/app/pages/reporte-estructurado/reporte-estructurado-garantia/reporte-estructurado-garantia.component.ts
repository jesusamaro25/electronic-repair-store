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
import { GeneralServiceService } from '../../../Services/general-service.service';
import { DatePipe } from '@angular/common';

let detalleGarantia: any[] = [];
@Component({
  selector: 'app-reporte-estructurado-garantia',
  templateUrl: './reporte-estructurado-garantia.component.html',
  styleUrls: ['./reporte-estructurado-garantia.component.css']
})
export class ReporteEstructuradoGarantiaComponent implements OnInit {
 
  tcategoria: any;
  categoria: any = [];
  testado: any;
  estado: any = [];
  ttipo: any;
  tipo: any = [];

  all_tipo: any = [];

  inicioControl = new FormControl('', [
    Validators.required
  ]);

  finControl = new FormControl('', [
    Validators.required
  ]);

  estaControl = new FormControl('', [
    Validators.required
  ]);

  cateControl = new FormControl('', [
    Validators.required
  ]);

  tipoControl = new FormControl('', [
    Validators.required
  ]);
  
  displayedColumns: string[] = ['position','Descripcion','Cliente', 'Equipo','Inicio','Fin'];
  dataSource = new MatTableDataSource<Garantia>(detalleGarantia);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  resultado: any;
  datos: any;

  constructor(public servi: GeneralServiceService,private datePipe: DatePipe) {
    this.cargarCategoria()
    this.getAllTipos()
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
    doc.text(30, 25, 'Reporte De Garantias ')
    var img = new Image();
    img.src = "../../../../../../assets/images/Smartech_2.png"
    doc.addImage(img, 'PNG', 0,3,30,30)
    doc.addImage(img, 'PNG', 180,3,30,30)
    doc.save("Reporte.pdf")
  });
 }

 getAllTipos(){
  this.all_tipo=[];
  this.servi.getAll('tipoEquipo').then((result) => {
    this.resultado = result;
    for (let i = 0; i < this.resultado.data.length; i++) {
      this.datos = {
        id: this.resultado.data[i].id,
        nombre: this.resultado.data[i].nombre,
      };
      this.all_tipo.push(this.datos);
    }
  }, (err) => {
    console.log(err);
  }); 

}

cargarTipos(){
  this.tipoControl.setValue("")
  if(this.cateControl.value!="T"){
    this.tipo=this.cateControl.value.tipo
  }else{
    this.tipo=this.all_tipo
  }
}

cargarCategoria(){
  this.categoria=[];
  this.servi.getAll('categoriaTipoEquipo').then((result) => {
    this.resultado = result;
    for (let i = 0; i < this.resultado.data.length; i++) {
      this.datos = {
        id: this.resultado.data[i].id,
        nombre: this.resultado.data[i].nombre,
        tipo: this.resultado.data[i].tiposEquipo
      };
      this.categoria.push(this.datos);
    }
  }, (err) => {
    console.log(err);
  });    
}

CargarTabla(){

  if(this.inicioControl.valid && this.finControl.valid){

    let inicio=this.datePipe.transform(this.inicioControl.value, 'dd-MM-yyyy');
    let fin=this.datePipe.transform(this.finControl.value, 'dd-MM-yyyy');
    let string="reporte/garantia?fechaDesde="+inicio+"&fechaHasta="+fin;

    if(this.cateControl.valid && this.cateControl.value!="T"){
      string+="&idCategoriaTipoEquipo="+this.cateControl.value.id
    }
    if(this.tipoControl.valid && this.tipoControl.value!="T"){
      string+="&idTipoEquipo="+this.tipoControl.value.id
    }
    if(this.estaControl.valid && this.estaControl.value!="T"){
      string+="&estatus="+this.estaControl.value
    }

    this.servi.getAll(string).then((result) => {
      this.resultado = result;
      detalleGarantia = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          position: i+1,
          Descripcion: this.resultado.data[i].ordenServicio.catalogoServicio.descripcion,
          Equipo: this.resultado.data[i].ordenServicio.modeloEquipo.marca.nombre+" "+this.resultado.data[i].ordenServicio.modeloEquipo.nombre,
          Fin: this.resultado.data[i].ordenServicio.garantia.fechaExpiracion,
          Cliente: this.resultado.data[i].usuario.nombre+" "+ this.resultado.data[i].usuario.apellido,
          Inicio: this.resultado.data[i].ordenServicio.garantia.fechaEmision,
        };
        detalleGarantia.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(detalleGarantia);
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });
    
  }

}

}

export interface Garantia {
  position: number;
  Descripcion: string;
  Estado: string;
  Fecha: string;
  Categoria: string;
  TipoE: string;
 }

 const detalleGarantia2: Garantia[] = [
  {position: 1, Descripcion: 'Reparación de Consola', Estado: 'Activa', Fecha: '17/05/2019', Categoria: 'Videojuego', TipoE:'Consola'},
  {position: 2, Descripcion: 'Reparación de Consola', Estado: 'Vencida', Fecha: '17/05/2019', Categoria: 'Videojuego', TipoE:'Consola'},
  {position: 3, Descripcion: 'Reparación de Consola', Estado: 'Activa', Fecha: '17/05/2019', Categoria: 'Videojuego', TipoE:'Consola'},
  {position: 4, Descripcion: 'Reparación de Consola', Estado: 'Vencida', Fecha: '17/05/2019', Categoria: 'Videojuego', TipoE:'Consola'},
  {position: 5, Descripcion: 'Reparación de Consola', Estado: 'Vencida', Fecha: '17/05/2019', Categoria: 'Videojuego', TipoE:'Consola'}
];
