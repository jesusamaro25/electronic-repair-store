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

let solicitudServicio: any[] = [];
@Component({
  selector: 'app-reporte-estructurado-solicitud',
  templateUrl: './reporte-estructurado-solicitud.component.html',
  styleUrls: ['./reporte-estructurado-solicitud.component.css']
})


export class ReporteEstructuradoSolicitudComponent implements OnInit { 

  categoria: any = [];
  estado: any = [];
  tipo: any = [];
  all_tipo: any = [];

  displayedColumns: string[] = ['position', 'Servicio', 'Cliente','Equipo', 'Fecha'];
  dataSource = new MatTableDataSource<Solicitudes>(solicitudServicio);



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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  resultado: any;
  datos: any;

   constructor(public servi: GeneralServiceService,private datePipe: DatePipe) 
    {
      this.cargarCategoria()
      this.getAllTipos()
    }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  CargarTabla(){

    if(this.inicioControl.valid && this.finControl.valid){

      let inicio=this.datePipe.transform(this.inicioControl.value, 'dd-MM-yyyy');
      let fin=this.datePipe.transform(this.finControl.value, 'dd-MM-yyyy');
      let string="reporte/solicitudServicio?fechaDesde="+inicio+"&fechaHasta="+fin;

      if(this.estaControl.valid && this.estaControl.value!="T"){
        string+="&estatus="+this.estaControl.value
      }
      if(this.cateControl.valid && this.cateControl.value!="T"){
        string+="&idCategoriaTipoEquipo="+this.cateControl.value.id
      }
      if(this.tipoControl.valid && this.tipoControl.value!="T"){
        string+="&idTipoEquipo="+this.tipoControl.value.id
      }

      this.servi.getAll(string).then((result) => {
        this.resultado = result;
        solicitudServicio = [];
        for (let i = 0; i < this.resultado.data.length; i++) {
          this.datos = {
            position: i+1,
            Servicio: this.resultado.data[i].catalogoServicio.descripcion,
            Categoria:this.resultado.data[i].catalogoServicio.tipoEquipo.categoriaTipoEquipo.nombre,
            TipoE: this.resultado.data[i].catalogoServicio.tipoEquipo.nombre,
            Estado: this.resultado.data[i].estatus,
            Fecha: this.resultado.data[i].fecha,
            Cliente: this.resultado.data[i].usuario.nombre+" "+ this.resultado.data[i].usuario.apellido,
            Equipo: this.resultado.data[i].modeloEquipo.marca.nombre+" "+this.resultado.data[i].modeloEquipo.nombre
          };
          solicitudServicio.push(this.datos);
        }
        this.dataSource = new MatTableDataSource(solicitudServicio);
        this.dataSource.paginator = this.paginator;
      }, (err) => {
        console.log(err);
      });
      
    }

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

   //PDF
    downloadImagePDF()
    {
      var doc = new jspdf()
      var data = document.getElementById('content');
      html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      var position = 0;
      doc.addImage(contentDataURL, 'PNG', 0, 40, imgWidth, imgHeight)
      doc.setFontSize(30)
      doc.text(50, 25, 'Reporte de Solicitudes')
      var img = new Image();
      img.src = "../../../../../../assets/images/Smartech_2.png"
      doc.addImage(img, 'PNG', 0,3,30,30)
      doc.addImage(img, 'PNG', 180,3,30,30)
      doc.save("Reporte.pdf")
      });
     }
   
}

export interface Solicitudes {
  position: number;
  Servicio: string;
  Categoria: string;
  TipoE: string;
  Estado: string;
  Fecha: string;
}

const solicitudServicio2: Solicitudes[] = [
  {position: 1, Servicio: 'Reparación de Consola', Categoria:'Videojuegos', TipoE:'Consola', Estado: 'Aprobada', Fecha: '17/05/2019'},
  {position: 2, Servicio: 'Reparación de Consola', Categoria:'Videojuegos', TipoE:'Consola', Estado: 'Aprobada', Fecha: '17/05/2019'},
  {position: 3, Servicio: 'Reparación de Consola', Categoria:'Videojuegos', TipoE:'Consola', Estado: 'Aprobada', Fecha: '17/05/2019'},
  {position: 4, Servicio: 'Reparación de Consola', Categoria:'Videojuegos', TipoE:'Consola', Estado: 'Aprobada', Fecha: '17/05/2019'},
  {position: 5, Servicio: 'Reparación de Consola', Categoria:'Videojuegos', TipoE:'Consola', Estado: 'Aprobada', Fecha: '17/05/2019'},
];


