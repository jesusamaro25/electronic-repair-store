import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-tecnicos',
  templateUrl: './modal-tecnicos.component.html',
  styleUrls: ['./modal-tecnicos.component.css']
})
export class ModalTecnicosComponent implements OnInit {

  datos = {  estatus: 'A' };
  incluir: boolean = false;
  id: string;

  tecnicos:  any[]= [];


  tecnicosControl = new FormControl('',[
    Validators.required
  ]);

  descripcion = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<ModalTecnicosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public alert: funciones,
    public servi: GeneralServiceService) {

      if (data) {
        this.id = data.id;
        this.tecnicosControl.setValue(data.usuario.id);
        this.descripcion.setValue(data.descripcion)
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
    this.servi.getAll('empleado').then((resp: any) => {
      this.tecnicos = resp.data;
      console.log(this.tecnicos);
    }).catch((error) => {
      console.log(error);
    });
  }

  registrar() {
    this.dialogRef.close(this.datos);
    this.alert.registroExitoso();
  }

  actualizar() {

    if(this.descripcion.valid && this.descripcion.valid){

      const datos=new FormData()
      datos.append('descripcion',this.descripcion.value)
      datos.append('idUsuario',this.tecnicosControl.value)
      this.servi.putFormData(datos, 'tecnicoExhibicion', this.id)
      .then((resp: any) => {
        this.dialogRef.close(this.datos);

        this.alert.registroExitoso();
      }).catch((error) => {
        console.log(error);
      });

  }

    }
    

}
