import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';
import Swal from 'sweetalert2';
import { GeneralServiceService } from '../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-contrasena',
  templateUrl: './modal-contrasena.component.html',
  styleUrls: ['./modal-contrasena.component.css']
})
export class ModalContrasenaComponent implements OnInit {
  hide = true;
  datos: any;
  formContrasena: FormGroup;
  rol: any;

  constructor(
    public dialogRef: MatDialogRef<ModalContrasenaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public alert: funciones,
    public servicio: GeneralServiceService) {
    this.datos = this.data;
  }

  ngOnInit() {
    this.formContrasena = new FormGroup({
      contrasena: new FormControl('', [
        Validators.required
      ]),
      contrasenaAnterior: new FormControl('', [
        Validators.required
      ])
    });
    this.rol = localStorage.getItem('rol_tipo');
  }
  // registrar() {
  //   this.dialogRef.close(this.datos);
  //   this.alert.registroExitoso();
  // }
  registrar() {
    Swal.fire({
      title: 'Guardar cambios?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        if (this.rol == 'cliente') {
          const formData = new FormData();
          Object.entries(this.formContrasena.value).forEach(
            ([key, value]: any[]) => {
              formData.set(key, value);
            });
          this.servicio.putFormData(formData, 'cliente', localStorage.getItem('id')).then((resp: any) => {
            if (resp.status) {
              this.alert.okAlert('Datos Guardados');
              this.dialogRef.close(this.datos);
            } else {
              this.alert.errorAlert(resp.message.text);
            }
          }, (err) => {
            console.log(err);
          });

        } else {
          const formData = new FormData();
          Object.entries(this.formContrasena.value).forEach(
            ([key, value]: any[]) => {
              formData.set(key, value);
            });
          this.servicio.putFormData(formData, 'empleado', localStorage.getItem('id')).then((resp: any) => {
            if (resp.status) {
              this.alert.okAlert('Datos Guardados');
              this.dialogRef.close(this.datos);
            } else {
              this.alert.errorAlert(resp.message.text);
            }
          }, (err) => {
            console.log(err);
          });

        }

      }
    });

  }
}
