import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';
import { RolesComponent } from '../../../../configuracion/configuracion-opcion/roles/roles.component';
import { GeneralServiceService } from '../../../../../Services/general-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-registro-usuario',
  templateUrl: './modal-registro-usuario.component.html',
  styleUrls: ['./modal-registro-usuario.component.css']
})


export class ModalRegistroUsuarioComponent implements OnInit {

  datos = { nombre:'', apellido:'', sexo:'',correo:'',fechaNacimiento:'', roles:'', estatus: 'A' };
  incluir: boolean = false;
  id: string;
 
  value: any;
  resultado: any;
 
  public loading = false; //para mostrar los imagen de carga
 
  roles:  any[]=[];

   nombreControl = new FormControl('', [
     Validators.required
   ]);
   apellidoControl = new FormControl('', [
     Validators.required
   ]);
 
   sexoControl = new FormControl('', [
     Validators.required
   ]);
   correoControl = new FormControl('', [
     Validators.required
   ]);
 
   fechaNacimientoControl = new FormControl('', [
     Validators.required
   ]);
 
  rolesControl = new FormControl('',[
    Validators.required
    ]);
 
    constructor(public dialogRef: MatDialogRef<RolesComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones, public servicio: GeneralServiceService, private datePipe: DatePipe) {
          
      this.CargarRoles();

       if (data) {
         this.id = data.id;
         this.nombreControl.setValue(data.nombre);
         this.apellidoControl.setValue(data.apellido);
         this.sexoControl.setValue(data.sexo);
         this.correoControl.setValue(data.correo);
         console.log(data.fechaNacimiento)
         this.fechaNacimientoControl.setValue(new Date(alert.formatDate(this.data.fechaNacimiento)));
         this.rolesControl.setValue(data.rol.id);

       } else {
         this.incluir = true;
       }
 
     }
     
     ngOnInit() {
 
       } 

       CargarRoles(){

        this.servicio.getAll('rol?includeJefe=true').then((result) => {
          this.resultado = result;
          this.roles =this.resultado.data;
        }, (err) => {
          console.log(err);
        });
    
      }
       
  registrar(){
   if (this.nombreControl.valid && this.apellidoControl.valid && this.sexoControl.valid
     && this.correoControl.valid && this.fechaNacimientoControl.valid) {
     const datos = new FormData();
     datos.append('nombre',this.nombreControl.value);
     datos.append('apellido',this.apellidoControl.value);
     datos.append('sexo',this.sexoControl.value);
     datos.append('correo',this.correoControl.value);
     datos.append('fechaNacimiento',this.datePipe.transform(this.fechaNacimientoControl.value, 'dd-MM-yyyy'));
     datos.append('idRol',this.rolesControl.value);
     this.loading = true;
     this.dialogRef.disableClose=true;
     this.servicio.postFormData(datos,'empleado').then((result) => {
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
 
   if (this.nombreControl.valid && this.apellidoControl.valid && this.sexoControl.valid
     && this.correoControl.valid && this.fechaNacimientoControl.valid) {
     const datos = new FormData();
     datos.append('nombre',this.nombreControl.value);
     datos.append('apellido',this.apellidoControl.value);
     datos.append('sexo',this.sexoControl.value);
     datos.append('correo',this.correoControl.value);
     datos.append('fechaNacimiento',this.datePipe.transform(this.fechaNacimientoControl.value, 'dd-MM-yyyy'));
     datos.append('idRol',this.rolesControl.value);
     this.loading = true;
     this.dialogRef.disableClose=true;
     this.servicio.putFormData(datos,'empleado',this.id).then((result) => {
 
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

