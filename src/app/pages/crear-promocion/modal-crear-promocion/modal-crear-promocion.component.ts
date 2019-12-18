import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../assets/funciones';
import { GeneralServiceService } from '../../../Services/general-service.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-crear-promocion',
  templateUrl: './modal-crear-promocion.component.html',
  styleUrls: ['./modal-crear-promocion.component.css']
})
export class ModalCrearPromocionComponent implements OnInit {

  datos : any;
  incluir: boolean = false;
  id: string;

  descuentos:  any[]=[];
  catalogos:  any[]=[];

  nombreControl = new FormControl('', [
    Validators.required
  ]);

  imagenFormControl= new FormControl('',
  [
    Validators.required
  ]);

  desControl = new FormControl('', [
    Validators.required
  ]);

  descuControl = new FormControl('', [
    Validators.required
  ]);

  cataControl = new FormControl('', [
    Validators.required
  ]);

  iniControl = new FormControl('', [
    Validators.required
  ]);

  finControl = new FormControl('', [
    Validators.required
  ]);

  imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "assets/images/default.png";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  public loading = false; //para mostrar los imagen de carga
  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  resultado: any;

  constructor(public dialogRef: MatDialogRef<ModalCrearPromocionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService,private datePipe: DatePipe) {

      this.cargarDescuento()
      this.cargarCatalogo()
      
      if (data) {
        this.id = data.id;
        this.imagen = data.imagen;
        this.nombreControl.setValue(data.nombre);
        this.desControl.setValue(data.descripcion);
        this.descuControl.setValue(data.id_descuento);
        this.cataControl.setValue(data.id_catalogo);
        this.iniControl.setValue(new Date(alert.formatDate(this.data.f_inicio)));
        this.finControl.setValue(new Date(alert.formatDate(this.data.f_fin)));
      } else {
        this.incluir = true;
      }

  }

  ngOnInit() {
  }

  cargarDescuento(){

    this.servicio.getAll('descuento').then((result) => {
      this.resultado = result;
      this.descuentos =this.resultado.data;
    }, (err) => {
      console.log(err);
    });

  }

  cargarCatalogo(){

    this.servicio.getAll('catalogoServicio').then((result) => {
      this.resultado = result;
      this.catalogos =this.resultado.data;
    }, (err) => {
      console.log(err);
    });

  }

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

  registrar(){

    if (this.nombreControl.valid && this.imagenFormControl.valid && this.descuControl.valid && this.desControl.valid &&
      this.cataControl.valid && this.iniControl.valid && this.finControl.valid) {

      const datos = new FormData();
      datos.append('nombre',this.nombreControl.value);
      datos.append('imagen', this.imagenSeleccionada);
      datos.append('descripcion',this.desControl.value);
      datos.append('idDescuento',this.descuControl.value);
      datos.append('idCatalogoServicio',this.cataControl.value);
      datos.append('fechaInicio',this.datePipe.transform(this.iniControl.value, 'dd-MM-yyyy'));
      datos.append('fechaExpiracion',this.datePipe.transform(this.finControl.value, 'dd-MM-yyyy'));
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'promocion').then((result) => {
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

    if (this.nombreControl.valid && this.descuControl.valid && this.desControl.valid &&
      this.cataControl.valid && this.iniControl.valid && this.finControl.valid) {

      const datos = new FormData();
      datos.append('nombre',this.nombreControl.value);
      if (this.imagenSeleccionada != null) {
        datos.append('imagen', this.imagenSeleccionada);
      }
      datos.append('descripcion',this.desControl.value);
      datos.append('idDescuento',this.descuControl.value);
      datos.append('idCatalogoServicio',this.cataControl.value);
      datos.append('fechaInicio',this.datePipe.transform(this.iniControl.value, 'dd-MM-yyyy'));
      datos.append('fechaExpiracion',this.datePipe.transform(this.finControl.value, 'dd-MM-yyyy'));
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'promocion',this.id).then((result) => {

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

}
