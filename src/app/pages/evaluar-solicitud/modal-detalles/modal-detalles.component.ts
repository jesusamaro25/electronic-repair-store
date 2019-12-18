import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GeneralServiceService } from '../../../Services/general-service.service';

@Component({
  selector: 'app-modal-detalles',
  templateUrl: './modal-detalles.component.html',
  styleUrls: ['./modal-detalles.component.css']
})
export class ModalDetallesComponent implements OnInit {

  form = { fecha_solicitud:'',servicio:'',fecha_revision:'',hora_revision:'',promocion:'',problema:''};
  datos: any;
  peticion: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public servicio: GeneralServiceService) {

    this.peticion=false;
    this.servicio.getAll('solicitudServicio/'+data.id).then((result) => {
      this.datos = result;
      this.peticion=true;

    }, (err) => {
      console.log(err);
    });

  }

  ngOnInit() {
    
  }

}
