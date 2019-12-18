import { Component, OnInit } from '@angular/core';
import { funciones } from '../../../../../assets/funciones';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  horaIControl = new FormControl('', [
    Validators.required
  ]);

  horaFControl = new FormControl('', [
    Validators.required
  ]);

  feriadoIControl = new FormControl('', [
    Validators.required
  ]);

  feriadoFControl = new FormControl('', [
    Validators.required
  ]);
  resultado: any;
  id: any;

  constructor(private dialog: MatDialog, public alert: funciones,public servicio: GeneralServiceService) {
  }

  ngOnInit() {
    this.CargarDatos()
  }

  CargarDatos(){

    this.servicio.getAll('horarioTrabajo').then((result) => {
      
      this.resultado = result;
      this.horaIControl.setValue(this.resultado.data.horaInicio);
      this.horaFControl.setValue(this.resultado.data.horaFinal);

      this.feriadoIControl.setValue(this.resultado.data.horaInicioFeriado);
      this.feriadoFControl.setValue(this.resultado.data.horaFinalFeriado);
      

      
    }, (err) => {
      console.log(err);
    });

  }

  guardar(){

    if (this.horaIControl.valid && this.horaFControl.valid && this.feriadoIControl.valid && this.feriadoFControl.valid){

      Swal.fire({

        title: 'Guardar cambios?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
  
      }).then((result) => {if (result.value) {


          const datos = new FormData();
          datos.append('horaInicio',this.horaIControl.value);
          datos.append('horaFinal',this.horaFControl.value);
          datos.append('horaInicioFeriado',this.feriadoIControl.value);
          datos.append('horaFinalFeriado',this.feriadoFControl.value);
          
          this.servicio.putFormDataSingle(datos,'horarioTrabajo').then((result) => {
            this.alert.okAlert("Datos Guardados");
          }, (err) => {
            console.log(err);
          });
          
      }})


    }

  }

}
