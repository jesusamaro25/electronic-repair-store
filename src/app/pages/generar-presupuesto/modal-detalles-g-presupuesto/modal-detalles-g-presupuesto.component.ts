import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-detalles-g-presupuesto',
  templateUrl: './modal-detalles-g-presupuesto.component.html',
  styleUrls: ['./modal-detalles-g-presupuesto.component.css']
})
export class ModalDetallesGPresupuestoComponent implements OnInit {

  form = { marca:'',
    modelo:'',
    problema:'',
    cliente:'',
    diagnostico:''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form.marca=data.marca_nombre;
    this.form.modelo=data.modelo_nombre;
    this.form.problema=data.problema;
    this.form.cliente=data.cliente_nombre;
    this.form.diagnostico=data.diagnostico;
  }

  ngOnInit() {
  }

}
