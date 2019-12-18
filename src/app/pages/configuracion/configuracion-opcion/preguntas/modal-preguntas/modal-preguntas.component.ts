import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-preguntas',
  templateUrl: './modal-preguntas.component.html',
  styleUrls: ['./modal-preguntas.component.css']
})
export class ModalPreguntasComponent implements OnInit {
  datos = { pregunta:'', respuesta:'', estatus: 'A' };
  incluir: boolean = false;
  id: string;

  public loading = false; //para mostrar los imagen de carga
  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga

  preguntaControl = new FormControl('', [
    Validators.required
  ]);

  respuestaControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public dialogRef: MatDialogRef<ModalPreguntasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) {

      if (data) {
        this.id = data.id;
        this.preguntaControl.setValue(data.pregunta);
        this.respuestaControl.setValue(data.respuesta);
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }

  registrar(){

    if (this.preguntaControl.valid && this.respuestaControl.valid) {
      const datos = new FormData();
      datos.append('pregunta',this.preguntaControl.value);
      datos.append('respuesta',this.respuestaControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'preguntaFrecuente').then((result) => {
        this.loading = false;
        this.alert.okAlert("Datos Guardados");
        this.dialogRef.close(datos);
      }, (err) => {
        console.log(err);
        this.dialogRef.disableClose=false;
        this.loading = false;
      });
    }

  }

  actualizar(){

    if (this.preguntaControl.valid && this.respuestaControl.valid) {
      const datos = new FormData();
      datos.append('pregunta',this.preguntaControl.value);
      datos.append('respuesta',this.respuestaControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'preguntaFrecuente',this.id).then((result) => {

        this.loading = false;
        this.alert.okAlert("Datos Guardados");
        this.dialogRef.close(datos);

      }, (err) => {
        console.log(err);
        this.dialogRef.disableClose=false;
        this.loading = false;
      });
    }
  }

}
