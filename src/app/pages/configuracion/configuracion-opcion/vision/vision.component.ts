import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.css']
})
export class VisionComponent implements OnInit {

  imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "/assets/images/user/1.jpg";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  public loading = false; //para mostrar los tres puntitos al incluir o modificar la imagen
  resultado: any;
  id: string;

  constructor(private dialog: MatDialog, public alert: funciones,public servicio: GeneralServiceService) {
   }

  ngOnInit() {
    this.CargarDatos()
  }
  
  registrar(){
    this.alert.registroExitoso();
  }

  public imagePath;
  imgURL: any;
  public message: string;
  
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

  imagenFormControl= new FormControl('',[
    Validators.required
  ]);

  textoControl = new FormControl('', [
    Validators.required
  ]);

  CargarDatos(){

    this.servicio.getAll('empresa').then((result) => {
      
      this.resultado = result;
      this.id=this.resultado.data.id;
      this.imagen= this.resultado.data.urlImagenVision;
      this.textoControl.setValue(this.resultado.data.vision);

      
    }, (err) => {
      console.log(err);
    });

  }

  guardar(dato){

    if (this.textoControl.valid){


      Swal.fire({

        title: 'Guardar cambios?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
  
      }).then((result) => {if (result.value) {


          const datos = new FormData();
          datos.append('vision',this.textoControl.value);
          if (this.imagenSeleccionada != null) 
          {
            datos.append('imagenVision', this.imagenSeleccionada);
          }
          this.servicio.putFormDataSingle(datos,'empresa').then((result) => {
            this.alert.okAlert("Datos Guardados");
          }, (err) => {
            console.log(err);
          });
          
      }})


    }
    
    

  }

}

