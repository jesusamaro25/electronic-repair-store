import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { funciones } from '../../../assets/funciones';
import Swal from 'sweetalert2';
import { GeneralServiceService } from '../../Services/general-service.service';

export interface TablaData {
  id: number;
  comentario: string;
  respuesta: string;
  tipocomentario: string;
}

let Comentarios: any[] = [];

@Component({
  selector: 'app-evaluar-comentarios',
  templateUrl: './evaluar-comentarios.component.html',
  styleUrls: ['./evaluar-comentarios.component.css']
})
export class EvaluarComentariosComponent implements OnInit {
  
  value:any;
  resultado:any;

  constructor(
    public dialog: MatDialog,
    public alert: funciones,
    public servicio: GeneralServiceService) { 
    this.CargarTabla();
  }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  @ViewChild(MatPaginator ) paginator: MatPaginator;
  @ViewChild(MatSort ) sort: MatSort;

  displayedColumns: string[] = ['comentario','tipocomentario','acciones'];
  dataSource: MatTableDataSource<TablaData>;
  datos: TablaData;

  CargarTabla(){
    this.servicio.getAll('comentario/sinResponder').then((result) => {
    this.resultado = result;
    console.log("resultado??: ",this.resultado)
    Comentarios = [];
    for (let i = 0; i < this.resultado.data.length; i++) {
      this.datos = {
        id: this.resultado.data[i].id,
        comentario: this.resultado.data[i].descripcion,
        respuesta: this.resultado.data[i].respuesta,
        tipocomentario: this.resultado.data[i].tipoComentario.nombre
      };
      Comentarios.push(this.datos);
    }
    this.dataSource = new MatTableDataSource(Comentarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  },(err) => {
    console.log(err);
  });
}

  async atenderComentario(datos){
    console.log("que me trae datoooss? ",datos)
    const idComentario = datos.id
    const {value: text} = await Swal.fire({
      title: 'Quieres responder este comentario?',
      type:'question',
      input: 'textarea',
      inputPlaceholder:'Indique su respuesta.',
      showCancelButton: true,
      confirmButtonText:'Responder',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes indicar una respuesta!'
        }
      }
    })
    if (text) {
      //console.log("que me trae datos? ", datos)
      console.log("Esto trae text??: ", text)
      
      const datos = new FormData();
      datos.append('respuesta', text);
      
      this.servicio.putFormData(datos,'comentario',idComentario).then((result) => {
        this.CargarTabla()
      }, (err) => {
        console.log(err);
      });

      Swal.fire({
        toast: true,
        type:'success',
        titleText:'Comentario Respondido',
        showConfirmButton: false,
        timer: 2000,
        position: 'top-right'
    })
    }
  }
  
  cancelarComentario(data){
    console.log("Que me trae data?: ", data)
    const idComentario = data.id
    Swal.fire({
      text: "Quieres cancelar este comentario?",
      type: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if(result.value) {
        this.servicio.delete('comentario',idComentario).then((result) => {
          this.CargarTabla();
          //this.alert.okAlert("Datos Guardados");
          Swal.fire({
            toast: true,
            type:'error',
            titleText:'Comentario cancelado',
            showConfirmButton: false,
            timer: 2000,
            position: 'top-right'
          })
        }, (err) => {
          console.log(err);
        });
      }
    })
  }
  
  filtro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
