import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-modal-detalle-reclamo',
  templateUrl: './modal-detalle-reclamo.component.html',
  styleUrls: ['./modal-detalle-reclamo.component.css']
})
export class ModalDetalleReclamoComponent implements OnInit {

  form = { 
    marca:'',
    modelo:'',
    problema:'',
    servicio:''
  };

  condiciones=[
    {
      id:'1',
      desc:'Debe poseer el mismo serial que cuando se entrego'
    },
    {
      id:'2',
      desc:'No se debe haber reparado por otra persona'
    },
    {
      id:'1',
      desc:'No deben haber piezas nuevas reemplazadas'
    }
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form.marca=data.marca_nombre;
    this.form.modelo=data.modelo_nombre;
    this.form.problema=data.problema;
    this.form.servicio=data.servicio_nombre;

  }

  ngOnInit() {
  }

}
