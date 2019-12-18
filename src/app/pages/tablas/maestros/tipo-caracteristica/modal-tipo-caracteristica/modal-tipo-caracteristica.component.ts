import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-tipo-caracteristica',
  templateUrl: './modal-tipo-caracteristica.component.html',
  styleUrls: ['./modal-tipo-caracteristica.component.css']
})
export class ModalTipoCaracteristicaComponent implements OnInit {
  
  datos = { nombre: '',estatus: 'A' };
  incluir: boolean = false;
  id: string;

  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  public loading = false; //para mostrar los imagen de carga
  resultado: any;


  nombreControl = new FormControl('', [
    Validators.required
  ]);
  
  constructor(public dialogRef: MatDialogRef<ModalTipoCaracteristicaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) { 

      if (data) {
        this.id = data.id;
        this.nombreControl.setValue(data.nombre);
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }

  registrar(){
     if (this.nombreControl.valid) {
     const datos = new FormData();
     datos.append('nombre',this.nombreControl.value);
     this.loading = true;
     this.dialogRef.disableClose=true;
     this.servicio.postFormData(datos,'tipoCaracteristicaCliente').then((result) => {
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
   
   if (this.nombreControl.valid) {
     const datos = new FormData();
     datos.append('nombre',this.nombreControl.value);
     this.loading = true;
     this.dialogRef.disableClose=true;
     this.servicio.putFormData(datos,'tipoCaracteristicaCliente',this.id).then((result) => {

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
