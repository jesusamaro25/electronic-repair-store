import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-detalles-solicitudes',
  templateUrl: './modal-detalles-solicitudes.component.html',
  styleUrls: ['./modal-detalles-solicitudes.component.css']
})
export class ModalDetallesSolicitudesComponent implements OnInit {

  form = { 
    marca:'',
    modelo:'',
    fecha_solicitud:'',
    fecha_revision:'',
    problema:'',
    servicio:'',
    motivo_rechazo: ''
  };

  actividad: boolean;
  motivo: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if(data.fecha_actividad[0] != undefined){
      this.actividad=true
    }else{
      this.actividad=false
    }

    if(data.motivo_rechazo.tipoRechazo =='Solicitud' || data.motivo_rechazo.tipoRechazo =='Revision'){
      this.motivo=true
    }else{
      this.motivo=false
    }

    this.form.marca=data.marca_nombre;
    this.form.modelo=data.modelo_nombre;
    this.form.fecha_solicitud=data.fecha_solicitud;
    this.form.fecha_revision=data.fecha_actividad;
    this.form.problema=data.problema;
    this.form.servicio=data.servicio_nombre;
    this.form.motivo_rechazo=data.motivo_rechazo;

  }

  ngOnInit() {
  }

}
