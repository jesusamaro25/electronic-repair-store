import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ModalContrasenaComponent } from './modal-contrasena/modal-contrasena.component';
import { funciones } from '../../../../assets/funciones';
import { GeneralServiceService } from '../../../Services/general-service.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

export interface Datos {
  nombre: string;
  fecha: string;
}

export interface TipoCliente {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;
  dia: FormControl = new FormControl();
  imagenDefecto: 'assets/images/2x1.jpg'; // imagen por defecto que se le pasa al incluir

  resultado: any;
  rol: any;

  incluir = true;

  imagen;                                             // variable para mostrar las imágenes
  imagenSeleccionada: File = null;                    // variable tipo File que se utiliza para mostrar una vista previa de la imagen
  public loading = false;                             // para mostrar los tres puntitos al incluir o modificar la imagen
  formPerfil: FormGroup;


  constructor(
    private dialog: MatDialog,
    public alert: funciones,
    public servicio: GeneralServiceService) {

  }

  ngOnInit() {
    this.formPerfil = new FormGroup({
      id: new FormControl('', [
        Validators.required
      ]),
      documentoIdentidad: new FormControl('',
        [
        ]),

      fechaNacimiento: new FormControl('',
        [
          Validators.required
        ]),

      nombre: new FormControl('',
        [
          Validators.required
        ]),

      apellido: new FormControl('',
        [
          Validators.required
        ]),

      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),

      telefono: new FormControl('',
        [
          Validators.required
        ]),

      direccion: new FormControl('',
        [
          Validators.required
        ]),

      idRol: new FormControl(
        {
          value: '',
          disabled: true
        },
        [
          Validators.required
        ]),
      sexo: new FormControl('',
        [
          Validators.required
        ]),
      foto: new FormControl('', [
      ]),
      imagenFormControl: new FormControl('', [])
    });
    this.LlenarForm();
  }

  CargarCliente() {
    this.servicio.getAll('cliente/' + localStorage.getItem('id')).then((result) => {
      this.resultado = result;
      this.formPerfil.patchValue({
        nombre: this.resultado.data.nombre,
        apellido: this.resultado.data.apellido,
        email: this.resultado.data.correo,
        telefono: this.resultado.data.telefono,
        direccion: this.resultado.data.direccion,
        sexo: this.resultado.data.sexo,
        idRol: this.resultado.data.rol.nombre,
        documentoIdentidad: this.resultado.data.documentoIdentidad,
        fechaNacimiento: this.formatFechaEntrante(this.resultado.data.fechaNacimiento, 'DD-MM-YYYY'),
        id: this.resultado.data.id
      });
      console.log(this.resultado);
      this.imagenDefecto = this.resultado.data.urlFoto;
      localStorage.setItem('urlFoto', this.resultado.data.urlFoto);
    });

  }

  CargarEmpleado() {
    this.servicio.getAll('empleado/' + localStorage.getItem('id')).then((result) => {
      this.resultado = result;
      this.formPerfil.patchValue({
        nombre: this.resultado.data.nombre,
        apellido: this.resultado.data.apellido,
        email: this.resultado.data.correo,
        telefono: this.resultado.data.telefono,
        direccion: this.resultado.data.direccion,
        sexo: this.resultado.data.sexo,
        idRol: this.resultado.data.rol.nombre,
        documentoIdentidad: this.resultado.data.documentoIdentidad,
        fechaNacimiento: this.formatFechaEntrante(this.resultado.data.fechaNacimiento, 'DD-MM-YYYY'),
        id: this.resultado.data.id
      });
      console.log(this.resultado);
      this.imagenDefecto = this.resultado.data.urlFoto;
      localStorage.setItem('urlFoto', this.resultado.data.urlFoto);
    });


  }

  formatFechaEntrante(fecha: string, formato: string) {
    return new Date(
      parseInt(moment(fecha, [formato]).format('YYYY'), 10),
      parseInt(moment(fecha, [formato]).format('MM'), 10) - 1,
      parseInt(moment(fecha, [formato]).format('DD'), 10));
  }

  formatFechaSaliente(fecha: string, formato: string ) {
    return moment(fecha).format(formato);
  }

  LlenarForm() {
    this.rol = localStorage.getItem('rol_tipo');
    console.log(this.rol);
    if (this.rol === 'cliente') {
      this.CargarCliente();
    } else {
      this.CargarEmpleado();
    }
  }

  guardar() {
    Swal.fire({
      title: 'Guardar cambios?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.formPerfil.patchValue({fechaNacimiento: this.formatFechaSaliente(this.formPerfil.get('fechaNacimiento').value, 'DD-MM-YYYY')});
        if (this.rol === 'cliente') {
          const formData = new FormData();
          Object.entries(this.formPerfil.value).forEach(
            ([key, value]: any[]) => {
              formData.set(key, value);
            });
          this.servicio.putFormData(formData, 'cliente', localStorage.getItem('id')).then((resp: any) => {
            this.alert.okAlert('Datos Guardados');
            setTimeout(() => {
              location.reload();
            }, 2000);
            this.CargarCliente();
          }, (err) => {
            console.log(err);
          });

        } else {
          const formData = new FormData();
          Object.entries(this.formPerfil.value).forEach(
            ([key, value]: any[]) => {
              formData.set(key, value);
            });
            this.servicio.putFormData(formData, 'empleado', localStorage.getItem('id')).then((resp: any) => {
            this.alert.okAlert('Datos Guardados');
            setTimeout(() => {
              location.reload();
            }, 2000);
            this.CargarEmpleado();
          }, (err) => {
            console.log(err);
          });

        }

      }
    });

  }


  // Funcion para las imágenes
  imagenEntrada(img: FileList) {
    this.imagenSeleccionada = img.item(0);
    // Para mostrar un preview de la imagen
    const lector = new FileReader();
    lector.onload = (event: any) => {
      this.imagen = event.target.result;
      this.imagenDefecto = event.target.result;
    };
    lector.readAsDataURL(this.imagenSeleccionada);
    this.formPerfil.patchValue({foto: this.imagenSeleccionada});
  }

  onCambioContra() {
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(ModalContrasenaComponent);
  }

  onRegistrar() {

  }

}
