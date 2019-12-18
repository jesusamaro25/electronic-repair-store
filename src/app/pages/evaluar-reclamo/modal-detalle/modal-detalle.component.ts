import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-detalles',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.css']
})
export class ModalDetalleComponent implements OnInit {
 
  form = { 
    cliente_nombre:'',
    marca_nombre: '',
    modelo_nombre:'',
    fecha_reclamo:'',
    tipo_reclamo:'',
    descripcion:'',
  };




  // form = { fecha_solicitud:'',fecha_reclamo: '',tipo_reclamo:'',Descripcion:'', servicio:'',fecha_revision:'',hora_revision:'',promocion:'',problema:''};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

    this.form.fecha_reclamo=data.fecha_reclamo;
    this.form.tipo_reclamo=data.tipo_reclamo;
    this.form.cliente_nombre=data.cliente_nombre;
    this.form.marca_nombre=data.marca_nombre;
    this.form.modelo_nombre=data.modelo_nombre;
    this.form.descripcion=data.descripcion;

    
  }

  ngOnInit() {
    
  }

}
 