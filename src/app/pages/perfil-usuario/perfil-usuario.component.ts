import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Por favor  Ingresa un valor' :
        this.email.hasError('email') ? 'Correo no valido' :
            '';
  }
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Lara'},
    {value: 'pizza-1', viewValue: 'Barinas'},
    {value: 'tacos-2', viewValue: 'Merida'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
