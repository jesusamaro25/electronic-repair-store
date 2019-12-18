import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalModeloEquipoComponent } from '../../modelo-equipo/modal-modelo-equipo/modal-modelo-equipo.component';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-motivo-rechazo',
  templateUrl: './modal-motivo-rechazo.component.html',
  styleUrls: ['./modal-motivo-rechazo.component.css']
})
export class ModalMotivoRechazoComponent implements OnInit {

  datos: any;
  incluir: boolean = false;
  id: string;

  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  public loading = false; //para mostrar los imagen de carga
  resultado: any;

  desControl = new FormControl('', [
    Validators.required
  ]);

  tipoControl = new FormControl('',[
    Validators.required
  ]);

  constructor(public dialogRef: MatDialogRef<ModalModeloEquipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) {

      if (data) {
        this.id = data.id;
        this.desControl.setValue(data.descripcion);
        this.tipoControl.setValue(data.tipo);
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }

  registrar(){

    if (this.desControl.valid && this.tipoControl.valid) {
      const datos = new FormData();
      datos.append('descripcion',this.desControl.value);
      datos.append('tipoRechazo',this.tipoControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'motivoRechazo').then((result) => {
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

    if (this.desControl.valid && this.tipoControl.valid) {
      const datos = new FormData();
      datos.append('descripcion',this.desControl.value);
      datos.append('tipoRechazo',this.tipoControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'motivoRechazo',this.id).then((result) => {

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
