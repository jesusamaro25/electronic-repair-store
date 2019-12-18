import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { GeneralServiceService } from '../Services/general-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioValido: boolean = false;

  datos: any;
  idProm: string;
  idServi: string;

  constructor(public router: Router,public servicio: GeneralServiceService,route: ActivatedRoute) {

    let token = localStorage.getItem('token');
    this.idProm = route.snapshot.paramMap.get('idProm')
    this.idServi = route.snapshot.paramMap.get('idServi')

    if(token){

      if(localStorage.getItem('rol_tipo')=='cliente'){

        if(this.idServi!=null && this.idProm!=null){

          this.router.navigate(['/solicitar-servicio', { idProm: this.idProm, idServi: this.idServi}]);

        }else{

          this.router.navigate(['/dashboard']);

        }

      }else{

        this.router.navigate(['/dashboard']);

      }

    }

  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passFormControl = new FormControl('', [
      Validators.required,
  ]);

  login(){

    if (this.emailFormControl.valid && this.passFormControl.valid) {

      const datos = new FormData();
      datos.append('correo',this.emailFormControl.value);
      datos.append('contrasena',this.passFormControl.value);

      this.servicio.login(datos).then((result) => {

        this.datos = result;
        console.log(this.datos);
        if(this.datos.status==true){

          localStorage.setItem('id', this.datos.data.id);
          localStorage.setItem('nombre', this.datos.data.nombre);
          localStorage.setItem('apellido',this.datos.data.apellido);
          localStorage.setItem('correo',this.datos.data.correo);
          localStorage.setItem('direccion',this.datos.data.direccion);
          localStorage.setItem('telefono',this.datos.data.telefono);
          localStorage.setItem('fechaNacimiento',this.datos.data.fechaNacimiento);
          localStorage.setItem('sexo',this.datos.data.sexo);
          localStorage.setItem('urlFoto',this.datos.data.urlFoto);
          localStorage.setItem('documentoIdentidad',this.datos.data.documentoIdentidad);
          localStorage.setItem('rol_id',this.datos.data.rol.id);
          localStorage.setItem('rol_tipo',this.datos.data.rol.tipoRol);
          localStorage.setItem('rol',this.datos.data.rol.nombre);
          localStorage.setItem('token', this.datos.data.token);

          if(localStorage.getItem('rol_tipo')=='cliente'){

            if(this.idServi!=null && this.idProm!=null){

              this.router.navigate(['/solicitar-servicio', { idProm: this.idProm, idServi: this.idServi}]);
    
            }else{
    
              this.router.navigate(['/dashboard']);
    
            }
            
          }else{

            this.router.navigate(['/dashboard']);
            
          }
          

        }else{
          this.usuarioValido = true;
        }
      }, (err) => {

      });

    }

  }

  ngOnInit() {
  }

}

