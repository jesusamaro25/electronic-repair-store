import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-duracion-garantia',
  templateUrl: './modal-duracion-garantia.component.html',
  styleUrls: ['./modal-duracion-garantia.component.css']
})
export class ModalDuracionGarantiaComponent implements OnInit {

  datos: any;
  incluir: boolean = false;
  id: string;

  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  public loading = false; //para mostrar los imagen de carga
  resultado: any;

  diasControl = new FormControl('', [
    Validators.required
  ]);


  constructor(public dialogRef: MatDialogRef<ModalDuracionGarantiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) {

      if (data) {
        this.id = data.id;
        this.diasControl.setValue(data.dias);
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }

  registrar(){

    if (this.diasControl.valid) {
      const datos = new FormData();
      datos.append('dia',this.diasControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'duracionGarantia').then((result) => {
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

    if (this.diasControl.valid) {
      const datos = new FormData();
      datos.append('dia',this.diasControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'duracionGarantia',this.id).then((result) => {

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
