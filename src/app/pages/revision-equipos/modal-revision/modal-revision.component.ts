import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { funciones } from '../../../../assets/funciones';
import { GeneralServiceService } from '../../../Services/general-service.service';

@Component({
  selector: 'app-modal-revision',
  templateUrl: './modal-revision.component.html',
  styleUrls: ['./modal-revision.component.css']
})
export class ModalRevisionComponent implements OnInit {

  public loading = false; //para mostrar los imagen de carga
  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga

  motivos: any[]=[]
  costo: any[]=[
    {
      minimo: '10000',
      maximo: '20000'
    }
  ];
  montos: any;
  min: number;
  max: number;
  id: any;
  resultado: any;
  datos: any;
  bool: boolean=false;

  constructor(public dialogRef: MatDialogRef<ModalRevisionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) {
      if (data) {
        this.id = data.id;
      }
      this.cargarRechazos()
      this.cargarRango()
    }

  ngOnInit() {
  }

  cargarRango(){
    this.servicio.getAll('precio').then((result) => {
      this.montos = result;
      this.min=this.montos.data.precioMinimoRevision
      this.max=this.montos.data.precioMaximoRevision
      
    }, (err) => {
      console.log(err);
    });
  }

  cargarRechazos(){
    this.servicio.getAll('motivoRechazo/tiporechazo/Revision').then((result) => {
      this.resultado = result;
      this.motivos = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          descripcion: this.resultado.data[i].descripcion
        };
        this.motivos.push(this.datos);
      }
    }, (err) => {
      console.log(err);
    });
  }

  cargar(){
    if(this.resulControl.value=="R"){
      this.bool=true
    }else{
      this.motiControl.setValue('')
      this.bool=false
    }
  }



  guardar: any;
  diagnosticoControl = new FormControl('', [
    Validators.required
  ]);

  resulControl = new FormControl('', [
    Validators.required
  ]);

  costoControl = new FormControl('', [
    Validators.required
  ]);

  motiControl = new FormControl('', [
    Validators.required
  ]);

  doRevision(){

    if (this.diagnosticoControl.valid && this.resulControl.valid && this.costoControl.valid) {
      const datos = new FormData();
      datos.append('costo',this.costoControl.value);
      datos.append('diagnostico',this.diagnosticoControl.value);
      datos.append('estatusEquipo',this.resulControl.value);
      if(this.motiControl.valid){
        datos.append('idMotivoRechazo',this.motiControl.value);
      }
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'solicitudServicio/'+this.id+'/revisar').then((result) => {
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
