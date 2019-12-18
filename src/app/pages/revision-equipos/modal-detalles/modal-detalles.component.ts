import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-detalles',
  templateUrl: './modal-detalles.component.html',
  styleUrls: ['./modal-detalles.component.css']
})
export class ModalDetallesRevisionComponent implements OnInit {

  form = { marca:'',
    modelo:'',
    problema:'',
    cliente:''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form.marca=data.marca_nombre;
    this.form.modelo=data.modelo_nombre;
    this.form.problema=data.problema;
    this.form.cliente=data.cliente_nombre;
  }

  ngOnInit() {

  }

}
