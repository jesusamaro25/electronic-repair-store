import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-detalles-equipo-reparacion',
  templateUrl: './modal-detalles-equipo-reparacion.component.html',
  styleUrls: ['./modal-detalles-equipo-reparacion.component.css']
})
export class ModalDetallesEquipoReparacionComponent implements OnInit {

  form = { 
    marca:'',
    modelo:'',
    problema:'',
    diagnostico:'',
    servicio:'',
    promocion:'',
    descuento:0,
    costo_revision:0,
    costo_servicio:0,
    resultado:'',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form.marca=data.marca_nombre;
    this.form.modelo=data.modelo_nombre;
    this.form.problema=data.problema;
    this.form.diagnostico=data.diagnostico;
    this.form.servicio=data.servicio_nombre;
    this.form.promocion=data.promocion_nombre;
    this.form.descuento=data.descuento;
    this.form.costo_revision=data.costo_revision;
    this.form.costo_servicio=data.costo_servicio;
    this.form.resultado=data.resultado;
   }

  ngOnInit() {
    
  }

}
