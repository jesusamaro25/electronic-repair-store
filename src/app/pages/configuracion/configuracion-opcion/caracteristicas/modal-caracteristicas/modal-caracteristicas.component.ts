import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-caracteristicas',
  templateUrl: './modal-caracteristicas.component.html',
  styleUrls: ['./modal-caracteristicas.component.css']
})
export class ModalCaracteristicasComponent implements OnInit {

  datos = { servicio:'', descripcion:'', estatus: 'A' };
  incluir: boolean = false;
  id: string;

  tituloControl = new FormControl('', [
    Validators.required
  ]);

  descripcionControl = new FormControl('', [
    Validators.required
  ]);

  imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "assets/images/default.png";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  public loading = false; //para mostrar los imagen de carga
  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga

  constructor(public dialogRef: MatDialogRef<ModalCaracteristicasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) {

      if (data) {
        this.id = data.id;
        this.tituloControl.setValue(data.titulo);
        this.descripcionControl.setValue(data.descripcion);
        this.imagen = data.imagen;
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }

  registrar(){
    this.dialogRef.close(this.datos);
    this.alert.registroExitoso();
  }

  actualizar(){

    if (this.tituloControl.valid && this.descripcionControl.valid) {
      const datos = new FormData();
      datos.append('titulo',this.tituloControl.value);
      datos.append('descripcion',this.descripcionControl.value);
      if (this.imagenSeleccionada != null) 
      {
        datos.append('imagen', this.imagenSeleccionada);
      }
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'caracteristicaEmpresa',this.id).then((result) => {

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

    // Funcion para las imágenes 
    imagenEntrada(img: FileList) {
      this.imagenSeleccionada = img.item(0);
      //Para mostrar un preview de la imagen
      var lector = new FileReader();
      lector.onload = (event: any) => {
        this.imagen = event.target.result;
        this.imagenDefecto = event.target.result;
      }
      lector.readAsDataURL(this.imagenSeleccionada);
    }

    imagenFormControl= new FormControl('',
    [
      Validators.required
    ]);

}