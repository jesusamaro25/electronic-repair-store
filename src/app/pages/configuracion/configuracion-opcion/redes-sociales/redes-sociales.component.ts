import { Component, OnInit } from '@angular/core';
import { funciones } from '../../../../../assets/funciones';
import { MatDialog } from '@angular/material';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-redes-sociales',
  templateUrl: './redes-sociales.component.html',
  styleUrls: ['./redes-sociales.component.css']
})
export class RedesSocialesComponent implements OnInit {

  resultado: any;

  constructor(private dialog: MatDialog, public alert: funciones,public servicio: GeneralServiceService) {
  }

 ngOnInit() {
   this.CargarDatos()
 }

  faceControl = new FormControl('', [
    Validators.required
  ]);

  instaControl = new FormControl('', [
    Validators.required
  ]);

  twiControl = new FormControl('', [
    Validators.required
  ]);

  CargarDatos(){

    this.servicio.getAll('empresa').then((result) => {
      
      this.resultado = result;
      this.instaControl.setValue(this.resultado.data.instagram);
      this.faceControl.setValue(this.resultado.data.facebook);
      this.twiControl.setValue(this.resultado.data.twitter);

      
    }, (err) => {
      console.log(err);
    });

  }

  guardar(){

    if (this.faceControl.valid && this.instaControl.valid && this.twiControl.valid ){

      Swal.fire({

        title: 'Guardar cambios?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
  
      }).then((result) => {if (result.value) {

          const datos = new FormData();
          datos.append('facebook',this.faceControl.value);
          datos.append('instagram',this.faceControl.value);
          datos.append('twitter',this.faceControl.value);
          this.servicio.putFormDataSingle(datos,'empresa').then((result) => {
            this.alert.okAlert("Datos Guardados");
          }, (err) => {
            console.log(err);
          });
          
      }})


    }
    
    

  }


}
