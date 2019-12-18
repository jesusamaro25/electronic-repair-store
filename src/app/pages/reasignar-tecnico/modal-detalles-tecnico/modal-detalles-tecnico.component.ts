import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-modal-detalles-tecnico',
  templateUrl: './modal-detalles-tecnico.component.html',
  styleUrls: ['./modal-detalles-tecnico.component.css']
})
export class ModalDetallesTecnicoComponent implements OnInit {

 form = { 
    cliente:'',
    tecnico:'',
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

    this.form.cliente=data.cliente_nombre;
    this.form.tecnico=data.tecnico_responsable;
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

