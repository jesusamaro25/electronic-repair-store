import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-detalles-reclamos',
  templateUrl: './modal-detalles-reclamos.component.html',
  styleUrls: ['./modal-detalles-reclamos.component.css']
})
export class ModalDetallesReclamosComponent implements OnInit {

  form = { marca:'',
  modelo:'',
  reclamo:'',
  cliente:''
  };

  condiciones:any=[
    {condicion: "condicion1"},
    {condicion: "condicion2"},
    {condicion: "condicion3"},
    {condicion: "condicion4"}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form.marca=data.marca_nombre;
    this.form.modelo=data.modelo_nombre;
    this.form.reclamo=data.problema;
    this.form.cliente=data.cliente_nombre;
  }

  ngOnInit() {
  }

  resulControl = new FormControl('', [
    Validators.required
  ]);

}
