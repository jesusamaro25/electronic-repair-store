import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';

@Component({
  selector: 'app-modal-objetivo',
  templateUrl: './modal-objetivo.component.html',
  styleUrls: ['./modal-objetivo.component.css']
})
export class ModalObjetivoComponent implements OnInit {

  datos = { nombre:'',estatus: 'A' };
  incluir: boolean = false;
  id: string;

  nombreControl = new FormControl('', [
    Validators.required
  ]);

  imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "assets/images/default.png";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  public loading = false; //para mostrar los tres puntitos al incluir o modificar la imagen

  constructor(public dialogRef: MatDialogRef<ModalObjetivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones) {

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
    this.dialogRef.close(this.datos);
    this.alert.registroExitoso();
  }

  actualizar(){
    this.dialogRef.close(this.datos);
    this.alert.registroExitoso();
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