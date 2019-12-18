import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-detalle-servicios-reclamo',
  templateUrl: './modal-detalle-servicios-reclamo.component.html',
  styleUrls: ['./modal-detalle-servicios-reclamo.component.css']
})
export class ModalDetalleServiciosReclamoComponent implements OnInit {

form = { marca:'',
    modelo:'',
    promocion:'',
    diagnostico:''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.form.marca=data.marca_nombre;
    this.form.modelo=data.modelo_nombre;
    this.form.promocion=data.promocion_nombre;
    this.form.diagnostico=data.diagnostico;
  }

  ngOnInit() {
  }

}

