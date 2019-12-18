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

let solicitudClientes: any[] = [];
@Component({
  selector: 'app-reporte-estructurado-cliente',
  templateUrl: './reporte-estructurado-cliente.component.html',
  styleUrls: ['./reporte-estructurado-cliente.component.css']
})
export class ReporteEstructuradoClienteComponent implements OnInit {

  ttipocaracteristica: any;
  tipocaracteristica: any = [];
  tcaracteristica: any;
  caracteristica: any = [];
  texo: any;
  sexo: any = [];
  tedad: any;
  edad: any = [];

  all_tipo: any = [];

  caras: any = [];
  tipos: any = [];

  displayedColumns: string[] = ['position', 'Cliente', 'Correo', 'Fecha'];
  dataSource = new MatTableDataSource<Clientes>(solicitudClientes);

  caraControl = new FormControl('', [
    Validators.required
  ]);

  tipoControl = new FormControl('', [
    Validators.required
  ]);

  edadControl = new FormControl('', [
    Validators.required
  ]);

  sexoControl = new FormControl('', [
    Validators.required
  ]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  resultado: any;
  datos: any;

  constructor(public servi: GeneralServiceService,private datePipe: DatePipe) 
  {
    this.cargarTipos()
    this.getAllCaras()
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
     doc.text(30, 25, 'Reporte De Clientes')
     var img = new Image();
     img.src = "../../../../../../assets/images/Smartech_2.png"
     doc.addImage(img, 'PNG', 0,3,30,30)
     doc.addImage(img, 'PNG', 180,3,30,30)
     doc.save("Reporte.pdf")
   });
  }

  getAllCaras(){
    this.all_tipo=[];
    this.servi.getAll('caracteristicaCliente').then((result) => {
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
    this.tipos=[];
    console.log("tipo")
    this.servi.getAll('tipoCaracteristicaCliente').then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre,
          cara: this.resultado.data[i].caracteristicasCliente
        };
        this.tipos.push(this.datos);
      }
    }, (err) => {
      console.log(err);
    });    
  }

  cargarCaras(){
    this.caraControl.setValue("")
    if(this.tipoControl.value!="T"){
      this.caras=this.tipoControl.value.cara
    }else{
      this.caras=this.all_tipo
    }
  }

  CargarTabla(){

    let string="reporte/cliente?param=algo";

    if(this.sexoControl.valid && this.sexoControl.value!="T"){
      string+="&sexo="+this.sexoControl.value
    }
    if(this.edadControl.valid){
      string+="&edad="+this.edadControl.value
    }
    if(this.tipoControl.valid && this.tipoControl.value!="T"){
      string+="&idTipoCaracteristicaCliente="+this.tipoControl.value.id
    }
    if(this.caraControl.valid && this.caraControl.value!="T"){
      string+="&idCaracteristicaCliente="+this.tipoControl.value.id
    }

    this.servi.getAll(string).then((result) => {
      this.resultado = result;
      solicitudClientes = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          position: i+1,
          Cliente: this.resultado.data[i].nombre+" "+this.resultado.data[i].apellido,
          Correo:this.resultado.data[i].correo,
          Fecha: this.resultado.data[i].fechaNacimiento,
        };
        solicitudClientes.push(this.datos);
      }
      this.dataSource = new MatTableDataSource(solicitudClientes);
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });
      
  }

}

export interface Clientes {
  position: number;
  Cliente: string;
  Sexo: string;
  Edad: string;
  Caracteristica: string;
}

const solicitudClientes2: Clientes[] = [
  {position: 1, Cliente: 'Maria Perez', Sexo: 'F', Edad: '14', Caracteristica:'Estudiante'},
  {position: 2, Cliente: 'Maria Perez', Sexo: 'F', Edad: '14', Caracteristica:'Estudiante'},
  {position: 3, Cliente: 'Maria Perez', Sexo: 'F', Edad: '14', Caracteristica:'Estudiante'},
  {position: 4, Cliente: 'Maria Perez', Sexo: 'F', Edad: '14', Caracteristica:'Estudiante'},
  {position: 5, Cliente: 'Maria Perez', Sexo: 'F', Edad: '14', Caracteristica:'Estudiante'},
];
