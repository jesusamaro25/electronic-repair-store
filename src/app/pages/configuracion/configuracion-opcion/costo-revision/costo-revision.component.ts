import { Component, OnInit } from '@angular/core';
import { funciones } from '../../../../../assets/funciones';
import { MatDialog } from '@angular/material';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-costo-revision',
  templateUrl: './costo-revision.component.html',
  styleUrls: ['./costo-revision.component.css']
})
export class CostoRevisionComponent implements OnInit {

  minControl = new FormControl('', [
    Validators.required
  ]);

  maxControl = new FormControl('', [
    Validators.required
  ]);
  resultado: any;

  constructor(private dialog: MatDialog, public alert: funciones,public servicio: GeneralServiceService) {
  }

  ngOnInit() {
    this.CargarDatos()
  }

  CargarDatos(){

    this.servicio.getAll('precio').then((result) => {
      
      this.resultado = result;
      this.minControl.setValue(this.resultado.data.precioMinimoRevision);
      this.maxControl.setValue(this.resultado.data.precioMaximoRevision);

      
    }, (err) => {
      console.log(err);
    });

  }

  guardar(){

    if (this.minControl.valid && this.maxControl.valid){


      Swal.fire({

        title: 'Guardar cambios?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
  
      }).then((result) => {if (result.value) {


          const datos = new FormData();
          datos.append('precioMinimoRevision',this.minControl.value);
          datos.append('precioMaximoRevision',this.maxControl.value);
          
          this.servicio.putFormDataSingle(datos,'precio').then((result) => {
            this.alert.okAlert("Datos Guardados");
          }, (err) => {
            console.log(err);
          });
          
      }})


    }

  }

}
