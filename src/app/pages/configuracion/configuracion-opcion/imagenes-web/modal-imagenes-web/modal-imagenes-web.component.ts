import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
     selector: 'app-modal-imagenes-web',
  templateUrl: './modal-imagenes-web.component.html',
    styleUrls:['./modal-imagenes-web.component.css']
})


export class ModalImagenesWebComponent implements OnInit {

  datos = { nombre:'',estatus: 'A' };
  incluir: boolean = false;
  id: string;

  nombreControl = new FormControl('', [
    Validators.required
  ]);

  imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "assets/images/agregar_imagen.png";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  public loading = false; //para mostrar los imagen de carga
  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga

  constructor(public dialogRef: MatDialogRef<ModalImagenesWebComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) {

      if (data) {
        this.id = data.id;
        this.nombreControl.setValue(data.nombre);

         this.imagen = data.imagen;
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }

  registrar(){

    if (this.imagenFormControl.valid) {
      const datos = new FormData();
      datos.append('imagen',this.imagenSeleccionada);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'carrusel').then((result) => {
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

    if (this.imagenSeleccionada != null) {

      const datos = new FormData();
      datos.append('imagen', this.imagenSeleccionada);
      
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'carrusel',this.id).then((result) => {

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








 
