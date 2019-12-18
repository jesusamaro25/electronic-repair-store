import { Component, OnInit, Inject } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones'
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-descuento-promocion',
  templateUrl: './modal-descuento-promocion.component.html',
  styleUrls: ['./modal-descuento-promocion.component.css']
})
export class ModalDescuentoPromocionComponent implements OnInit {

  datos = { descripcion: '',porcentaje: '',estatus: 'A' };
  incluir: boolean = false;
  id: string;

  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  public loading = false; //para mostrar los imagen de carga
  resultado: any;

  descripcionControl = new FormControl('', [
    Validators.required
  ]);

  porcentajeControl = new FormControl('', [
    Validators.required
  ]);

   constructor(public dialogRef: MatDialogRef< ModalDescuentoPromocionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService)
  {
    if (data) 
    {
        this.id = data.id;
        this.descripcionControl.setValue(data.descripcion);
        this.porcentajeControl.setValue(data.porcentaje);

    } else 
      {
        this.incluir = true;
      }
  }

   ngOnInit() {
  }
  
  registrar(){

    if (this.descripcionControl.valid && this.porcentajeControl.valid) {
      const datos = new FormData();
      datos.append('nombre',this.descripcionControl.value);
      datos.append('porcentaje',this.porcentajeControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'descuento').then((result) => {
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

    if (this.descripcionControl.valid && this.porcentajeControl.valid) {
      const datos = new FormData();
      datos.append('nombre',this.descripcionControl.value);
      datos.append('porcentaje',this.porcentajeControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'descuento',this.id).then((result) => {

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




