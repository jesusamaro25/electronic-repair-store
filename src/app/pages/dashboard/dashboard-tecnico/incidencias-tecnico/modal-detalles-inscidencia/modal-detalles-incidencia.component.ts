import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-detalles-incidencia',
  templateUrl: './modal-detalles-incidencia.component.html',
  styleUrls: ['./modal-detalles-incidencia.component.css']
})
export class ModalDetallesIncidenciaComponent implements OnInit {

  form: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = data;
  }

  ngOnInit() {

  }

}
