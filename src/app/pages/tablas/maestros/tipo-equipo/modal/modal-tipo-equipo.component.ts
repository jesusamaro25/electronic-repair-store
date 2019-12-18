import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones'
import { GeneralServiceService } from '../../../../../Services/general-service.service';


@Component({
  selector: 'app-modal-tipo-equipo',
  templateUrl: './modal-tipo-equipo.component.html',
  styleUrls: ['./modal-tipo-equipo.component.css']
})
export class ModalTipoEquipoComponent implements OnInit {


  datos = { nombre: '',estatus: 'A' };
  dataCategoria={};
  incluir: boolean = false;
  id: string;

  nombreControl = new FormControl('', [
    Validators.required
  ]);

  categoriaControl = new FormControl('', [
    Validators.required
  ]);

  imagenFormControl= new FormControl('',
  [
    Validators.required
  ]);


  imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "assets/images/default.png";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen

  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  public loading = false; //para mostrar los imagen de carga
  resultado: any;

  categorias:  any[]=[];

  constructor(public dialogRef: MatDialogRef<ModalTipoEquipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) { 

      this.CargarCategorias();


      if (data) {
        this.id = data.id;
        this.nombreControl.setValue(data.nombre);
        this.categoriaControl.setValue(data.idcategoria);
        this.imagen = data.imagen;
      } else {
        this.incluir = true;
      }

    }



  ngOnInit() {
  }

  

  CargarCategorias(){

    this.servicio.getAll('categoriaTipoEquipo').then((result) => {
      this.resultado = result;
      this.categorias =this.resultado.data;
    }, (err) => {
      console.log(err);
    });

  }

  registrar(){
    if (this.nombreControl.valid && this.categoriaControl.valid) {
      const datos = new FormData();
      datos.append('nombre',this.nombreControl.value);
      datos.append('idCategoriaTipoEquipo',this.categoriaControl.value);
      datos.append('imagen',this.imagenSeleccionada);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'tipoEquipo').then((result) => {
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
    if (this.nombreControl.valid && this.categoriaControl.valid) {
      const datos = new FormData();
      datos.append('nombre',this.nombreControl.value);
      datos.append('idCategoriaTipoEquipo',this.categoriaControl.value);
      if (this.imagenSeleccionada != null) 
      {
        datos.append('imagen', this.imagenSeleccionada);
      }
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'tipoEquipo',this.id).then((result) => {

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
    console.log(this.imagenSeleccionada);
    //Para mostrar un preview de la imagen
    var lector = new FileReader();
    lector.onload = (event: any) => {
      this.imagen = event.target.result;
      this.imagenDefecto = event.target.result;
    }
    lector.readAsDataURL(this.imagenSeleccionada);
  }

}
