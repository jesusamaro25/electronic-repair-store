import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GeneralServiceService } from '../../../../../Services/general-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-timeline-solicitudes',
  templateUrl: './modal-timeline-solicitudes.component.html',
  styleUrls: ['./modal-timeline-solicitudes.component.css']
})
export class ModalTimelineSolicitudesComponent implements OnInit {
  id: any;
  resultado: any;
  bool: boolean;
  datos: any;
  timeLine = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public servi: GeneralServiceService,private datePipe: DatePipe) { 
    this.id=data.id
  }


  ngOnInit() {
    this.servi.getAll('solicitudServicio/'+this.id+'/bitacora').then((result) => {
      this.resultado = result;
      this.timeLine = [];

      if(this.resultado.data.length==0){
        this.bool=true;
      }
      
      for (let i = 0; i < this.resultado.data.length; i++) {

        if (i % 2 == 0){

          this.datos = {
            year: this.resultado.data[i].fechaMovimiento,
            detail: this.resultado.data[i].descripcion,
            place: 'left',
          };

        }else{
          
          this.datos = {
            year: this.resultado.data[i].fechaMovimiento,
            detail: this.resultado.data[i].descripcion,
            place: 'right',
          };

        }

        
        this.timeLine.push(this.datos);
      }

    }, (err) => {
      console.log(err);
    });
  }

}
