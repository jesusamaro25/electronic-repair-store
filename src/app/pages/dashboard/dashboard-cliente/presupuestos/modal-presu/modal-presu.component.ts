import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GeneralServiceService } from '../../../../../Services/general-service.service';
import { data } from 'jquery';


@Component({
  selector: 'app-modal-presu',
  templateUrl: './modal-presu.component.html',
  styleUrls: ['./modal-presu.component.css']
})
export class ModalPresuComponent implements OnInit {

  peticion: boolean;
  datos: any;
  acti=[];
  total: number;
  descuento: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public servicio: GeneralServiceService) { 
    const porcentaje=data.promocion.descuento.porcentaje;
    const subtotal=data.presupuesto+data.costo_revision
    this.descuento=porcentaje*subtotal/100
    this.total=subtotal-this.descuento
  }

  ngOnInit() {
    this.servicio.getAll('ordenServicio/'+this.data.id).then((result) => {
      this.datos = result;

      this.acti=this.datos.data.actividades;

    }, (err) => {
      console.log(err);
    });
  }

}
