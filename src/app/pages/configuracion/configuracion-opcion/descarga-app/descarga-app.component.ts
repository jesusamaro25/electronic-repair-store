import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { FormControl, Validators } from '@angular/forms';
import { GeneralServiceService } from '../../../../Services/general-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-descarga-app',
  templateUrl: './descarga-app.component.html',
  styleUrls: ['./descarga-app.component.css']
})
export class DescargaAppComponent implements OnInit {

  imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "/assets/images/user/1.jpg";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  public loading = false; //para mostrar los tres puntitos al incluir o modificar la imagen

  titulodescargapp:String = "";
  descripciondescargapp:String = "";
  resultado: any;
  id: any;

  constructor(private dialog: MatDialog, public alert: funciones,public servicio: GeneralServiceService) {
   }

  ngOnInit() {
    this.CargarDatos()
  }
  
  guardar(dato){

    if (this.desControl.valid && this.tituloControl){


      Swal.fire({

        title: 'Guardar cambios?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
  
      }).then((result) => {if (result.value) {


          const datos = new FormData();
          datos.append('titulo',this.tituloControl.value);
          datos.append('descripcion',this.desControl.value);
          if (this.imagenSeleccionada != null) 
          {
            datos.append('imagen', this.imagenSeleccionada);
          }
          this.servicio.putFormData(datos,'descargaApp',this.id).then((result) => {
            this.alert.okAlert("Datos Guardados");
          }, (err) => {
            console.log(err);
          });
          
      }})


    }
    
    

  }

  CargarDatos(){

    this.servicio.getAll('descargaApp').then((result) => {
      
      this.resultado = result;
      this.id=this.resultado.data[0].id;
      this.imagen= this.resultado.data[0].urlImagen;
      this.tituloControl.setValue(this.resultado.data[0].titulo);
      this.desControl.setValue(this.resultado.data[0].descripcion);

      
    }, (err) => {
      console.log(err);
    });

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

  tituloControl = new FormControl('', [
    Validators.required
  ]);

  desControl = new FormControl('', [
    Validators.required
  ]);

}
