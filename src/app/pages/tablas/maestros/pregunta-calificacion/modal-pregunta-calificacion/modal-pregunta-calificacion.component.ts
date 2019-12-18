import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';
@Component({
  selector: 'app-modal-pregunta-calificacion',
  templateUrl: './modal-pregunta-calificacion.component.html',
  styleUrls: ['./modal-pregunta-calificacion.component.css']
})
export class ModalPreguntaCalificacionComponent implements OnInit {

  datos = { pregunta: '',estatus: 'A' };
  incluir: boolean = false;
  id: string;

  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  public loading = false; //para mostrar los imagen de carga
  resultado: any;

  preguntaControl = new FormControl('', [
    Validators.required
  ]);
  
  constructor(public dialogRef: MatDialogRef<ModalPreguntaCalificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) { 

      if (data) {
        this.id = data.id;
        this.preguntaControl.setValue(data.pregunta);
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }


  registrar(){
  if (this.preguntaControl.valid) {
      const datos = new FormData();
      datos.append('descripcion',this.preguntaControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'preguntaCalificacion').then((result) => {
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

    if (this.preguntaControl.valid) {
      const datos = new FormData();
      datos.append('descripcion',this.preguntaControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'preguntaCalificacion',this.id).then((result) => {

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
