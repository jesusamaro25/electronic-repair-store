import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-modelo-equipo',
  templateUrl: './modal-modelo-equipo.component.html',
  styleUrls: ['./modal-modelo-equipo.component.css']
})
export class ModalModeloEquipoComponent implements OnInit {

  datos = { nombre:'',estatus: 'A' };
  incluir: boolean = false;
  id: string;

  mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  public loading = false; //para mostrar los imagen de carga
  resultado: any;

  marca:  any[]=[];
  tipo:  any[]=[];

  nombreControl = new FormControl('', [
    Validators.required
  ]);

  marcaControl = new FormControl('',[
    Validators.required
  ]);

  tipoControl = new FormControl('',[
    Validators.required
  ]);

  constructor(public dialogRef: MatDialogRef<ModalModeloEquipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) {

      this.CargarMarcas();
      this.CargarTipos();

      if (data) {
        this.id = data.id;
        this.nombreControl.setValue(data.nombre);
        this.marcaControl.setValue(data.id_marca);
        this.tipoControl.setValue(data.id_tipo);
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }

  CargarMarcas(){

    this.servicio.getAll('marca').then((result) => {
      this.resultado = result;
      this.marca =this.resultado.data;
    }, (err) => {
      console.log(err);
    });

  }

  CargarTipos(){

    this.servicio.getAll('tipoEquipo').then((result) => {
      this.resultado = result;
      this.tipo =this.resultado.data;
    }, (err) => {
      console.log(err);
    });

  }

  registrar(){

    if (this.nombreControl.valid && this.marcaControl.valid && this.tipoControl.valid) {
      const datos = new FormData();
      datos.append('nombre',this.nombreControl.value);
      datos.append('idTipoEquipo',this.tipoControl.value);
      datos.append('idMarca',this.marcaControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'modeloEquipo').then((result) => {
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

    if (this.nombreControl.valid && this.marcaControl.valid && this.tipoControl.valid) {
      const datos = new FormData();
      datos.append('nombre',this.nombreControl.value);
      datos.append('idTipoEquipo',this.tipoControl.value);
      datos.append('idMarca',this.marcaControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'modeloEquipo',this.id).then((result) => {

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
