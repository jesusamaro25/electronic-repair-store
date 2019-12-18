import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones'
import { GeneralServiceService } from '../../../../../Services/general-service.service';

/*export interface DialogData {
  idCatalogoServicio: number;
}*/

@Component({
  selector: 'app-modal-actividad-por-servicio',
  templateUrl: './modal-actividad-por-servicio.component.html',
  styleUrls: ['./modal-actividad-por-servicio.component.css']
})
export class ModalActividadPorServicioComponent implements OnInit {


  datos = { nombre: '',estatus: 'A' };
  incluir: boolean = false;
  id: string;
  idCatalogoServ: number;

  desControl = new FormControl('', [
    Validators.required
  ]);
  nombControl = new FormControl('', [
    Validators.required
  ]);
  tservControl = new FormControl('', [
    Validators.required
  ]);
  costoControl = new FormControl('', [
    Validators.required
  ]);

  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  public loading = false; //para mostrar los imagen de carga
  resultado: any;
  tiposervicio:  any[]=[];

  idCatalogoServicio:number;

  constructor(public dialogRef: MatDialogRef<ModalActividadPorServicioComponent>,
    @Inject(MAT_DIALOG_DATA) /*public data2: DialogData,*/ public data: any,public alert: funciones,public servicio: GeneralServiceService) { 
      if (data.id) {
        console.log("data?: ",data)
        this.id = data.id;
        this.desControl.setValue(data.descripcion);
        this.costoControl.setValue(data.costo);
        this.idCatalogoServ = data;
      } else {
        this.incluir = true;
      }
    }

  ngOnInit() {
  }

  registrar(){
    if (this.desControl.valid && this.costoControl.valid) {
      const datos = new FormData();
      datos.append('nombre',this.desControl.value);
      datos.append('descripcion',this.desControl.value);
      datos.append('idCatalogoServicio',this.data);
      datos.append('costo',this.costoControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'actividad').then((result) => {
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
    console.log("que trae data en modal?: ",this.data)
    if (this.desControl.valid && this.costoControl.valid) {
      const datos = new FormData();
      datos.append('nombre',this.desControl.value);
      datos.append('descripcion',this.desControl.value);
      datos.append('costo',this.costoControl.value);
      //datos.append('idCatalogoServicio', this.data.catalogoServicio.id)
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'actividad',this.id).then((result) => {

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
