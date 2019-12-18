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
import { DatePipe } from '@angular/common';
import { GeneralServiceService } from '../../../Services/general-service.service';


let detalleIncidencias: any[] = [];
@Component({
  selector: 'app-reporte-estructurado-incidencia',
  templateUrl: './reporte-estructurado-incidencia.component.html',
  styleUrls: ['./reporte-estructurado-incidencia.component.css']
})

export class ReporteEstructuradoIncidenciaComponent implements OnInit {
  ttipo: any;
  tipo: any = [];
  ttecnico: any;
  tecnicos: any = [];
  tcategoria: any;
  categoria: any = [];
  ttipoe: any;
  tipoe: any = [];

  inicioControl = new FormControl('', [
    Validators.required
  ]);

  finControl = new FormControl('', [
    Validators.required
  ]);

  tecniControl = new FormControl('', [
    Validators.required
  ]);

  inciControl = new FormControl('', [
    Validators.required
  ]);

  cateControl = new FormControl('', [
    Validators.required
  ]);

  tipoControl = new FormControl('', [
    Validators.required
  ]);
 
  displayedColumns: string[] = ['position', 'Descripcion','Tipo','Equipo','Tecnico', 'Fecha'];
  dataSource = new MatTableDataSource<Incidencias>(detalleIncidencias);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  resultado: any;
  datos: any;
  all_tipo: any = [];
  incidencias: any = [];

  constructor(public servi: GeneralServiceService,private datePipe: DatePipe) { 
    this.cargarCategoria()
    this.getAllTipos()
    this.cargarIncidencia()
    this.cargarTecnicos()
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
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    const contentDataURL = canvas.toDataURL('image/png')
    var position = 0;
    doc.addImage(contentDataURL, 'PNG', 0, 40, imgWidth, imgHeight)
    doc.setFontSize(30)
    doc.text(30, 25, 'Reporte De Incidencias')
    var img = new Image();
    img.src = "../../../../../../assets/images/Smartech_2.png"
    doc.addImage(img, 'PNG', 0,3,30,30)
    doc.addImage(img, 'PNG', 180,3,30,30)
    doc.save("Reporte.pdf")
    });
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

  cargarIncidencia(){
    this.incidencias=[];
    this.servi.getAll('tipoIncidencia').then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre,
        };
        this.incidencias.push(this.datos);
      }
    }, (err) => {
      console.log(err);
    });    
  }

  cargarTecnicos(){
    this.tecnicos=[];
    this.servi.getAll('empleado').then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {

        if(this.resultado.data[i].rol.tipoRol=="tecnico"){

          this.datos = {
            id: this.resultado.data[i].id,
            nombre: this.resultado.data[i].nombre+" "+this.resultado.data[i].apellido,
          };
          this.tecnicos.push(this.datos);

        }
        
      }
    }, (err) => {
      console.log(err);
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

  CargarTabla(){

    if(this.inicioControl.valid && this.finControl.valid){
  
      let inicio=this.datePipe.transform(this.inicioControl.value, 'dd-MM-yyyy');
      let fin=this.datePipe.transform(this.finControl.value, 'dd-MM-yyyy');
      let string="reporte/incidencia?fechaDesde="+inicio+"&fechaHasta="+fin;
  
      if(this.inciControl.valid && this.inciControl.value!="T"){
        string+="&idTipoIncidencia="+this.inciControl.value.id
      }
      if(this.cateControl.valid && this.cateControl.value!="T"){
        string+="&idCategoriaTipoEquipo="+this.cateControl.value.id
      }
      if(this.tipoControl.valid && this.tipoControl.value!="T"){
        string+="&idTipoEquipo="+this.tipoControl.value.id
      }
      if(this.tecniControl.valid && this.tecniControl.value!="T"){
        string+="&idUsuario="+this.tecniControl.value.id
      }
  
      this.servi.getAll(string).then((result) => {
        this.resultado = result;
        detalleIncidencias = [];
        for (let i = 0; i < this.resultado.data.length; i++) {
          this.datos = {
            position: i+1,
            Descripcion: this.resultado.data[i].catalogoServicio.descripcion,
            Fecha: this.resultado.data[i].fecha,
            Tecnico: this.resultado.data[i].ordenServicio.usuario.nombreCompleto,
            Equipo: this.resultado.data[i].modeloEquipo.marca.nombre+" "+this.resultado.data[i].modeloEquipo.nombre,
            Tipo: this.resultado.data[i].ordenServicio.agendas[0].incidencia.tipoIncidencia.nombre
          };
          detalleIncidencias.push(this.datos);
        }
        this.dataSource = new MatTableDataSource(detalleIncidencias);
        this.dataSource.paginator = this.paginator;
      }, (err) => {
        console.log(err);
      });
      
    }
  
  }
 
}
export interface Incidencias {
  position: number;
  Descripcion: string;
  Tipo: string;
  Tecnico: string;
  Fecha: string;
  Categoria: string;
  TipoE: string;
}

const detalleIncidencias2: Incidencias[] = [
  {position: 1, Descripcion: 'Reparación de Lavadora', Tipo:'Falla de luz', Tecnico: 'Katherine', Fecha: '17/05/2019', Categoria: 'Linea Blanca', TipoE: 'Lavadora'},
  {position: 2, Descripcion: 'Reparación de Lavadora', Tipo:'Falla de luz', Tecnico: 'Katherine', Fecha: '17/05/2019', Categoria: 'Linea Blanca', TipoE: 'Lavadora'},
  {position: 3, Descripcion: 'Reparación de Lavadora', Tipo:'Falla de luz', Tecnico: 'Katherine', Fecha: '17/05/2019', Categoria: 'Linea Blanca', TipoE: 'Lavadora'},
  {position: 4, Descripcion: 'Reparación de Lavadora', Tipo:'Falla de luz', Tecnico: 'Katherine', Fecha: '17/05/2019', Categoria: 'Linea Blanca', TipoE: 'Lavadora'},
  {position: 5, Descripcion: 'Reparación de Lavadora', Tipo:'Falla de luz', Tecnico: 'Katherine', Fecha: '17/05/2019', Categoria: 'Linea Blanca', TipoE: 'Lavadora'},
  
];