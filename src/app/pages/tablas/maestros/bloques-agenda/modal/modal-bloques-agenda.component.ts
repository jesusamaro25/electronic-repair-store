import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones'
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-bloques-agenda',
  templateUrl: './modal-bloques-agenda.component.html',
  styleUrls: ['./modal-bloques-agenda.component.css']
})
export class ModalBloquesAgendaComponent implements OnInit {


  datos = { descripcion: '',hora_inicio: '',hora_fin: '' ,estatus: 'A' };
  incluir: boolean = false;
  id: string;

  descripcionControl = new FormControl('', [
    Validators.required
  ]);

  hora_inicioControl = new FormControl('', [
    Validators.required
  ]);

  hora_finControl = new FormControl('', [
    Validators.required
  ]);

  public loading = false; //para mostrar los imagen de carga
  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga

  constructor(public dialogRef: MatDialogRef<ModalBloquesAgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) { 

      if (data) {
        this.id = data.id;
        this.descripcionControl.setValue(data.descripcion);
        this.hora_inicioControl.setValue(data.hora_inicio);
        this.hora_finControl.setValue(data.hora_fin);
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }

  registrar(){
    if (this.descripcionControl.valid && this.hora_inicioControl.valid  && this.hora_finControl.valid) {
      const datos = new FormData();
      datos.append('descripcion',this.descripcionControl.value);
      datos.append('horaInicio',this.hora_inicioControl.value);
      datos.append('horaFinal',this.hora_finControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      console.log(datos);
      this.servicio.postFormData(datos,'bloquehorario').then((result) => {
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
    if (this.descripcionControl.valid && this.hora_inicioControl.valid  && this.hora_finControl.valid) {
      const datos = new FormData();
      datos.append('descripcion',this.descripcionControl.value);
      datos.append('horaInicio',this.hora_inicioControl.value);
      datos.append('horaFinal',this.hora_finControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'bloquehorario',this.id).then((result) => {

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
