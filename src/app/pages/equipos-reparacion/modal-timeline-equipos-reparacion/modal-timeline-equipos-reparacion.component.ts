import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GeneralServiceService } from '../../../Services/general-service.service';

@Component({
  selector: 'app-modal-timeline-equipos-reparacion',
  templateUrl: './modal-timeline-equipos-reparacion.component.html',
  styleUrls: ['./modal-timeline-equipos-reparacion.component.css']
})
export class ModalTimelineEquiposReparacionComponent implements OnInit {
  id: any;
  resultado: any;
  datos: any;
  bool: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public servi: GeneralServiceService) {
    this.id=data.id;
  }

  timeLine = []

  ngOnInit() {
    
    this.servi.getAll('ordenServicio/'+this.id).then((result) => {
      this.resultado = result;
      this.timeLine = [];

      if(this.resultado.data.agendas.length==0){
        this.bool=true;
      }
      
      for (let i = 0; i < this.resultado.data.agendas.length; i++) {

        if (i % 2 == 0){

          this.datos = {
            year: this.resultado.data.agendas[i].fechaActividad,
            detail: this.resultado.data.agendas[i].descripcion,
            place: 'left',
            estatus: this.resultado.data.agendas[i].estatus,
          };

        }else{
          
          this.datos = {
            year: this.resultado.data.agendas[i].fechaActividad,
            detail: this.resultado.data.agendas[i].descripcion,
            place: 'right',
            estatus: this.resultado.data.agendas[i].estatus,
          };

        }

        
        this.timeLine.push(this.datos);
      }

    }, (err) => {
      console.log(err);
    });

  }

  

}
