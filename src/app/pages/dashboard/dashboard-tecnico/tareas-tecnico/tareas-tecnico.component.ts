import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { funciones } from '../../../../../assets/funciones';

export interface Section {
  cliente: string;
  nombre: string;
  fecha: Date;
  hora: string;
  cols: number;
  rows: number;
  descripcion: string;
  modeloequipo: string;
  color: string;
}

@Component({
  selector: 'app-tareas-tecnico',
  templateUrl: './tareas-tecnico.component.html',
  styleUrls: ['./tareas-tecnico.component.css']
})
export class TareasTecnicoComponent implements OnInit {
  tareas: any[]

  constructor(public servi: GeneralServiceService, private router: Router,public alert: funciones) { }

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.servi.getAll('agenda/misAgendasPendientes').then((result: any) => {
      this.tareas = result.data;
    }).catch((err: any) => {
      console.error(err);
    });
  }

  goToPage(pageName: string, param: number) {
    this.router.navigate([`${pageName}`, { id: param }]);
  }

  aprobar(datos){
    Swal.fire({
      text: "Marcar actividad como completada?",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.value) {

          const post = new FormData();
          this.servi.postFormData(post,'agenda/'+datos.id+'/completar').then((result) => {
            this.alert.okAlert("Actividad Completada");
            this.cargarTareas();
          }, (err) => {
            console.log(err);
          });

        }
    })
  }

}
