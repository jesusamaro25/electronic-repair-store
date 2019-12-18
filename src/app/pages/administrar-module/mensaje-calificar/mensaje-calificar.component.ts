import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { funciones } from '../../../../assets/funciones';
import { GeneralServiceService } from '../../../Services/general-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mensaje-calificar',
  templateUrl: './mensaje-calificar.component.html',
  styleUrls: ['./mensaje-calificar.component.css']
})
export class MensajeCalificarComponent implements OnInit {

  textoControl = new FormControl('', [
    Validators.required
  ]);
  resultado: any;

  constructor(private dialog: MatDialog, public alert: funciones,public servicio: GeneralServiceService) {
    this.CargarDatos()
  }

 ngOnInit() {
 }
 
 registrar(){
   this.alert.registroExitoso();
 }

 CargarDatos(){

  this.servicio.getAll('mensaje/2').then((result) => {
    
    this.resultado = result;
    this.textoControl.setValue(this.resultado.data.descripcion);

    
  }, (err) => {
    console.log(err);
  });

}

guardar(){

  if (this.textoControl.valid){

    Swal.fire({

      title: 'Guardar cambios?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {if (result.value) {


        const datos = new FormData();
        datos.append('descripcion',this.textoControl.value);
        this.servicio.putFormData(datos,'mensaje','2').then((result) => {
          this.alert.okAlert("Datos Guardados");
        }, (err) => {
          console.log(err);
        });
        
    }})

  }
}

}

