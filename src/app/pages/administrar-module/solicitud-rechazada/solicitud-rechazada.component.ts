import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { funciones } from '../../../../assets/funciones';
import { GeneralServiceService } from '../../../Services/general-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud-rechazada',
  templateUrl: './solicitud-rechazada.component.html',
  styleUrls: ['./solicitud-rechazada.component.css']
})
export class SolicitudRechazadaComponent implements OnInit {

 imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "/assets/images/user/1.jpg";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  public loading = false; //para mostrar los tres puntitos al incluir o modificar la imagen
  resultado: any;

  constructor(private dialog: MatDialog, public alert: funciones,public servicio: GeneralServiceService) {
    this.CargarDatos()
   }

  ngOnInit() {
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

  tituloControl= new FormControl('',[
    Validators.required
  ]);

  textoControl= new FormControl('',[
    Validators.required
  ]);

  CargarDatos(){


    this.servicio.getAll('plantillaNotificacion/2').then((result) => {
      
      this.resultado = result;
      this.imagen= this.resultado.data.urlImagen;
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
          if (this.imagenSeleccionada != null) 
          {
            datos.append('imagen', this.imagenSeleccionada);
          }
          this.servicio.putFormData(datos,'plantillaNotificacion','2').then((result) => {
            this.alert.okAlert("Datos Guardados");
          }, (err) => {
            console.log(err);
          });
          
      }})

    }
  }

}