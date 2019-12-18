import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-servicios',
  templateUrl: './modal-servicios.component.html',
  styleUrls: ['./modal-servicios.component.css']
})
export class ModalServiciosComponent implements OnInit {
  
  datos = { descripcion:'', estatus: 'A' };
  incluir: boolean = false;
  id: string;

  servicioControl = new FormControl('',[
    Validators.required
  ]);

  descripcionControl = new FormControl('', [
    Validators.required
  ]);

  imagen;//variable para mostrar las imágenes
  imagenDefecto: string = "assets/images/default.png";//imagen por defecto que se le pasa al incluir
  imagenSeleccionada: File = null; // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  public loading = false; //para mostrar los tres puntitos al incluir o modificar la imagen
  Servicios:any = [];
  resultado:any;

  constructor(public dialogRef: MatDialogRef<ModalServiciosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,
    public servicio: GeneralServiceService
    ) {
      this.CargarServicios();
      if (data) {
        this.id = data.id;
        this.servicioControl.setValue(data.catalogoServicio.id);
        this.descripcionControl.setValue(data.descripcion);
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }
  
  CargarServicios(){
    this.servicio.getAll('catalogoServicio').then((result) => {
      this.resultado = result;
      this.Servicios =this.resultado.data;
    }, (err) => {
      console.log(err);
    });

  }

  actualizar(){
    
    if (this.servicioControl.valid && this.descripcionControl.valid) {
      const datos = new FormData();
      datos.append('descripcion',this.descripcionControl.value);
      datos.append('idCatalogoServicio',this.servicioControl.value)
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'servicioExhibicion',this.id).then((result) => {

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