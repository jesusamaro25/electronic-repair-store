import { Component, OnInit, Inject} from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { ModalTipoCaracteristicaComponent } from '../../tipo-caracteristica/modal-tipo-caracteristica/modal-tipo-caracteristica.component';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-caracteristicas-cliente',
  templateUrl: './modal-caracteristicas-cliente.component.html',
  styleUrls: ['./modal-caracteristicas-cliente.component.css']
})
export class ModalCaracteristicasClienteComponent implements OnInit {

 datos = { nombre:'',estatus: 'A' };
 incluir: boolean = false;
 id: string;

 mode='indeterminate'; //valor para que la barra de carga gire
  color='primary' //valor para el color de la barra de carga
  public loading = false; //para mostrar los imagen de carga
  resultado: any;


  tipo_caracteristicas:  any[]=[];

  nombreControl = new FormControl('', [
    Validators.required
  ]);

 tipo_caracteristicasControl = new FormControl('',[
    Validators.required
  ]);


  constructor(public dialogRef: MatDialogRef<ModalTipoCaracteristicaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones,public servicio: GeneralServiceService) {

    this.CargarTCaracteristica();


      if (data) {
        this.id = data.id;
        this.nombreControl.setValue(data.nombre);
        this.tipo_caracteristicasControl.setValue(data.id_tipo);
      } else {
        this.incluir = true;
      }

    }
    
    ngOnInit() {
  }


  CargarTCaracteristica()
  {
      this.servicio.getAll('tipoCaracteristicaCliente').then((result) => {
      this.resultado = result;
      this.tipo_caracteristicas =this.resultado.data;
    }, (err) => {
      console.log(err);
    });


  }


 registrar(){
 if (this.nombreControl.valid && this.tipo_caracteristicasControl.valid) {
      const datos = new FormData();
      datos.append('nombre',this.nombreControl.value);
      datos.append('idTipoCaracteristicaCliente',this.tipo_caracteristicasControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.postFormData(datos,'CaracteristicaCliente').then((result) => {
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
  if (this.nombreControl.valid && this.tipo_caracteristicasControl.valid) {
      const datos = new FormData();
       datos.append('nombre',this.nombreControl.value);
      datos.append('idTipoCaracteristicaCliente',this.tipo_caracteristicasControl.value);
      this.loading = true;
      this.dialogRef.disableClose=true;
      this.servicio.putFormData(datos,'CaracteristicaCliente',this.id).then((result) => {

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