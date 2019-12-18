import {Component, OnInit} from '@angular/core';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Users {
  name:string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dni = new FormControl();
  filterUsers: Observable<Users[]>;
  users: Users[] = [
  {
    name: 'Pedro',
    lastname: 'Perez',
    dni: '22533675',
    email: 'pedro@mail.com',
    phone:'04167755223'

  },
  {
    name: 'Juan',
    lastname: 'Gomez',
    dni: '23544233',
    email: 'juan@mail.com',
    phone:'04168722173'

  }
  ]

  constructor(private _formBuilder: FormBuilder) {
    this.filterUsers = this.dni.valueChanges
     .pipe(
      startWith(''),
      map(user => user ? this._filterUser(user): this.users.slice())
      );

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      selectSearh: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      categoryService: ['', Validators.required],
      drive: ['', Validators.required],
      market: ['', Validators.required],
      model: ['', Validators.required],
      description: ['', Validators.required]
    });

  
  }

   private _filterUser(value:string): Users[]{
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.dni.toLowerCase().indexOf(filterValue) === 0);
  }

  public asignValue(event: any){
    let value = event.target.value
    let userData = this.users.filter(user => user.dni.toLowerCase().indexOf(event.target.value) === 0)
    this.firstFormGroup.patchValue({name: userData[0].name});
    this.firstFormGroup.patchValue({lastname: userData[0].lastname});
    this.firstFormGroup.patchValue({dni: userData[0].dni});
    this.firstFormGroup.patchValue({email: userData[0].email});
    this.firstFormGroup.patchValue({phone: userData[0].phone});
  }

  alert(msg:any){
    alert("Datos enviados");
  }

}

