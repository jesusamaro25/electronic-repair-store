import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-modal-detalles-garantia',
  templateUrl: './modal-detalles-garantia.component.html',
  styleUrls: ['./modal-detalles-garantia.component.css']
})
export class ModalDetallesGarantiaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }

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

  ngOnInit() {
  }

}
