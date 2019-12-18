import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { funciones } from '../../../../assets/funciones';
import Swal from 'sweetalert2';
import { GeneralServiceService } from '../../../Services/general-service.service';


@Component({
  selector: 'app-correo-promocion',
  templateUrl: './correo-promocion.component.html',
  styleUrls: ['./correo-promocion.component.css']
})
export class CorreoPromocionComponent implements OnInit {
  resultado: any;

  constructor(private dialog: MatDialog, public alert: funciones,public servicio: GeneralServiceService ) {
    this.CargarDatos()
   }

  ngOnInit() {
  }



  textoControl = new FormControl('', [
    Validators.required
  ]);

  tituloControl = new FormControl('', [
    Validators.required
  ]);

  CargarDatos(){

    this.servicio.getAll('plantillaNotificacion/11').then((result) => {
      
      this.resultado = result;
      this.textoControl.setValue(this.resultado.data.descripcion);
      this.tituloControl.setValue(this.resultado.data.titulo);

      
    }, (err) => {
      console.log(err);
    });

  }

  guardar(){

    if (this.textoControl.valid && this.tituloControl.valid){


      Swal.fire({

        title: 'Guardar cambios?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
  
      }).then((result) => {if (result.value) {


          const datos = new FormData();
          datos.append('descripcion',this.textoControl.value);
          datos.append('titulo',this.tituloControl.value);
          this.servicio.putFormData(datos,'plantillaNotificacion','11').then((result) => {
            this.alert.okAlert("Datos Guardados");
          }, (err) => {
            console.log(err);
          });
          
      }})

    }
  }


}
