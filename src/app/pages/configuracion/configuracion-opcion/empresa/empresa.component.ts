import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../Services/general-service.service';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})

export class EmpresaComponent implements OnInit {

  datos = { id:'', nombre: '',telefono: '',direccion:'',correo:'',urlLogo:''};
  id: string;

  imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "/assets/images/user/1.jpg";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  public loading = false; //para mostrar los tres puntitos al incluir o modificar la imagen


  public imagePath;
  imgURL: any;
  public message: string;

  rifControl = new FormControl('', [
    Validators.required, 
  ]);

  nombreControl = new FormControl('', [
    Validators.required, 
  ]);
  
  correoControl = new FormControl('', [
    Validators.required, 
    Validators.email,
  ]); 

  imagenFormControl= new FormControl('',[
    Validators.required
  ]);

  telefono:String;
  direccion:String;
  resultado: any;
  Empresa:any=[];

  constructor(private dialog: MatDialog,
    public alert: funciones,
    public servicio: GeneralServiceService) {
    
      this.CargarEmpresa();
   }

  ngOnInit() {
  }

  CargarEmpresa(){
    this.servicio.getAll('Empresa').then((result) => {
      this.resultado = result;
      this.Empresa = this.resultado.data;
      console.log("Resultado en empresa: ",this.Empresa)
      this.rifControl.setValue(this.Empresa.rif)
      this.nombreControl.setValue(this.Empresa.nombre);
      this.correoControl.setValue(this.Empresa.correo);
      this.telefono = this.Empresa.telefono;
      this.direccion = this.Empresa.direccion;
      this.imagen = this.Empresa.urlLogo;
      
    }, (err) => {
      console.log(err);
    });
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

  actualizar(){
    if (this.nombreControl.valid && this.correoControl.valid) {
      const datos = new FormData();
      datos.append('rif',this.rifControl.value);
      datos.append('nombre',this.nombreControl.value);
      datos.append('telefono',this.telefono.toString());
      datos.append('direccion',this.direccion.toString());
      datos.append('correo',this.correoControl.value);
      if (this.imagenSeleccionada != null) 
      {
        datos.append('logo', this.imagenSeleccionada);
      }
      this.loading = true;
      this.servicio.putFormData(datos,'Empresa','').then((result) => {
        this.loading = false;
        this.alert.okAlert("Datos Guardados");
        this.CargarEmpresa();
      }, (err) => {
        console.log(err);
        //this.dialogRef.disableClose=false;
        this.loading = false;
      });
    }
  }
}
