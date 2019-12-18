import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../../../../../Services/general-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { funciones } from '../../../../../../assets/funciones';

export interface Section {
  nombre: string;
  fecha: Date;
  hora: string;
  cols: number;
  rows: number;
  descripcion: string;
  color: string;
}

@Component({
  selector: 'app-agenda-servicio',
  templateUrl: './agenda-servicio.component.html',
  styleUrls: ['./agenda-servicio.component.css']
})
export class AgendaServicioComponent implements OnInit {

  tareas: any[];
  id: any;

  constructor(
    public servi: GeneralServiceService, route: ActivatedRoute, private router: Router, public alert: funciones) {
    this.id = route.snapshot.paramMap.get('id');
  }


  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    const id_orden = this.id;
    this.servi.getAll('ordenServicio/' + id_orden + '/agendasPorCompletar').then((result: any) => {
      this.tareas = result.data;
    }).catch((err: any) => {
      console.error(err);
    });
  }

  goToPage(pageName: string, param: number) {
    this.router.navigate([`${pageName}`, { id: param }]);
  }

  aprobar(datos) {
    Swal.fire({
      text: 'Marcar actividad como completada?',
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {

        const post = new FormData();
        this.servi.postFormData(post, 'agenda/' + datos.id + '/completar').then((_result: any) => {
          this.alert.okAlert('Actividad Completada');
          this.cargarTareas();
        }, (err) => {
          console.log(err);
        });

      }
    });
  }

}
