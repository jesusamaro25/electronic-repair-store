import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
 
@Component({
  selector: 'app-modal-calificacion',
  templateUrl: './modal-calificacion.component.html',
  styleUrls: ['./modal-calificacion.component.css']
})

export class ModalCalificacionComponent implements  OnInit {


  datos = { id: '', pregunta1:'',pregunta2:'' , pregunta3:'',
                   respuesta1:'',respuesta2:'' ,respuesta3:'' };

  incluir: boolean = false;
  id: string;

  pregunta: any[] = [
    {
      id: '1',
      pregunta1: 'Que opinas del tiempo que tardo tu servicio?',
      respuesta1: 'no tardo mucho, me gusto'
    },
    {
      id: '2',
      pregunta2: 'Tuviste algun inconveniente durante la prestacion de tu servicio?',
      respuesta2: 'ninguno'
    },
    {
      id: '3',
      pregunta3: 'Te parece facil hacer seguimiento a tu solicitud?',
      respuesta3: 'si, es muy facil'
    }
  ];
   
 
 
  value: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder)
  { 
  
   
  }

  ngOnInit() {

    // this.formGroup = new FormGroup({
    //   rating: new FormControl(1, [Validators.required]),

    // })
}
 
 
}
