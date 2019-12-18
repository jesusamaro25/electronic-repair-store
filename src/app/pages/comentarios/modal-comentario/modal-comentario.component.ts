import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../assets/funciones';
import { GeneralServiceService } from '../../../Services/general-service.service';

@Component({
  selector: 'app-modal-comentario',
  templateUrl: './modal-comentario.component.html',
  styleUrls: ['./modal-comentario.component.css']
})
export class ModalComentarioComponent implements OnInit {

  datos = {tipocomentario:'',comentario:'',respuesta: '' };
  incluir: boolean = false;
  id: string;

  tipocomentarioControl = new FormControl('', [
    Validators.required
  ]);
  comentarioControl = new FormControl('', [
    Validators.required
  ]);

  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga

  resultado:any;
  tipoComentario:any=[];
  
  public loading = false; //para mostrar los imagen de carga
  constructor(
    public dialogRef: MatDialogRef<ModalComentarioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public alert: funciones,
    public servicio: GeneralServiceService) {

    this.cargarTipoComentario();

    if (data) {
      this.id = data.id;
      this.tipocomentarioControl.setValue(data.tipocomentario);
      this.comentarioControl.setValue(data.comentario);
    } else {
      this.incluir = true;
    }
   }

  ngOnInit() {
  }

  registrar(){
    console.log("tipoComentario?: ", this.tipocomentarioControl.value);
    console.log("comentario?: ",this.comentarioControl.value);
    if (this.comentarioControl.valid && this.tipocomentarioControl.valid) {
      const datos = new FormData();
      datos.append('idTipoComentario',this.tipocomentarioControl.value);
      datos.append('descripcion',this.comentarioControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'comentario').then((result) => {
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

    if (this.comentarioControl.valid) {
      const datos = new FormData();
      datos.append('idTipoComentario',this.tipocomentarioControl.value);
      datos.append('descripcion',this.comentarioControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'comentario',this.id).then((result) => {

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

  cargarTipoComentario(){
    //console.log("Entre aqui");
    this.servicio.getAll('tipoComentario').then((result) => {
      this.resultado = result;
      //console.log("Esto me trae result:? ",result)
      this.tipoComentario = this.resultado.data;
      //console.log("Esto me trae tipoComentario:? ", this.tipoComentario)
    })
  }
}
