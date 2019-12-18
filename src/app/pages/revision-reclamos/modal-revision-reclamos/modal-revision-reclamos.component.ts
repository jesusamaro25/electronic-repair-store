import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../assets/funciones';
import { GeneralServiceService } from '../../../Services/general-service.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal-revision-reclamos',
  templateUrl: './modal-revision-reclamos.component.html',
  styleUrls: ['./modal-revision-reclamos.component.css']
})
export class ModalRevisionReclamosComponent implements OnInit {

  public loading = false; //para mostrar los imagen de carga
  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga

  id: any;


  constructor(public dialogRef: MatDialogRef<ModalRevisionReclamosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) {
      if (data) {
        this.id = data.id;
      }
    }

  ngOnInit() {
  }

  guardar: any;
  diagnosticoControl = new FormControl('', [
    Validators.required
  ]);

  resulControl = new FormControl('', [
    Validators.required
  ]);

  doRevision(){

    if (this.diagnosticoControl.valid && this.resulControl.valid) {
      const datos = new FormData();
      datos.append('diagnostico',this.diagnosticoControl.value);
      datos.append('estatusEquipo',this.resulControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'solicitudServicio999/'+this.id+'/revisar').then((result) => {
        this.loading = false;
        this.alert.okAlert("Revisión Guardada");
        this.dialogRef.close(datos);
      }, (err) => {
        console.log(err);
        this.dialogRef.disableClose=false;
        this.loading = false;
      });
    }


  }

}
