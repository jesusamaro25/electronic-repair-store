import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-catalogo-servicio',
  templateUrl: './modal-catalogo-servicio.component.html',
  styleUrls: ['./modal-catalogo-servicio.component.css']
})
export class ModalCatalogoServicioComponent implements OnInit {

  datos = { nombre:'',estatus: 'A' };
  incluir: boolean = false;
  id: string;

  imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "assets/images/default.png";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  public loading = false; //para mostrar los imagen de carga
  resultado: any;

  tipoequipo:  any[]=[];
  tiposervicio:  any[]=[];

  desControl = new FormControl('', [
    Validators.required
  ]);

  tservControl = new FormControl('',[
    Validators.required
  ]);

  tequiControl = new FormControl('',[
    Validators.required
  ]);

  imagenFormControl= new FormControl('',
  [
    Validators.required
  ]);

  constructor(public dialogRef: MatDialogRef<ModalCatalogoServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) {

      this.CargarTipoServicio();
      this.CargarTipoEquipo();

      if (data) {
        this.id = data.id;
        this.desControl.setValue(data.descripcion);
        this.tservControl.setValue(data.id_tiposervicio);
        this.tequiControl.setValue(data.id_tipoequipo);
        this.imagen = data.imagen;
      } else {
        this.incluir = true;
      }
     }

  ngOnInit() {
  }

  CargarTipoServicio(){

    this.servicio.getAll('tiposervicio').then((result) => {
      this.resultado = result;
      this.tiposervicio =this.resultado.data;
    }, (err) => {
      console.log(err);
    });

  }

  CargarTipoEquipo(){

    this.servicio.getAll('tipoequipo').then((result) => {
      this.resultado = result;
      this.tipoequipo =this.resultado.data;
    }, (err) => {
      console.log(err);
    });

  }

  registrar(){

    if (this.desControl.valid && this.tservControl.valid && this.tequiControl.valid && this.imagenFormControl.valid) {
      const datos = new FormData();
      datos.append('descripcion',this.desControl.value);
      datos.append('idTipoEquipo',this.tequiControl.value);
      datos.append('idTipoServicio',this.tservControl.value);
      datos.append('imagen',this.imagenSeleccionada);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'catalogoservicio').then((result) => {
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

    if (this.desControl.valid && this.tservControl.valid && this.tequiControl.valid) {
      const datos = new FormData();
      datos.append('descripcion',this.desControl.value);
      datos.append('idTipoEquipo',this.tequiControl.value);
      datos.append('idTipoServicio',this.tservControl.value);
      if (this.imagenSeleccionada != null) 
      {
        datos.append('imagen', this.imagenSeleccionada);
      }
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'catalogoservicio',this.id).then((result) => {

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
