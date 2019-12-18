import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { funciones } from '../../../../assets/funciones'


@Component({
  selector: 'app-modal-reasignar-tecnico',
  templateUrl: './modal-reasignar-tecnico.component.html',
  styleUrls: ['./modal-reasignar-tecnico.component.css']
})


export class ModalReasignarTecnicoComponent implements OnInit {


form = { 
    tecnico:'',
  };

incluir: boolean = false;
 id: string;

  tecnicos:  any[]=[
    {
      id:'45',
      nombre:'Donai Torin'
    },
    {
      id:'45',
      nombre:'Luis Perez'
    },
    {
      id:'23',
      nombre:'Carlos Rodriguez'
    }
  ];
 
 tecnicosControl = new FormControl('',[
    Validators.required
    ]);

 constructor(public dialogRef: MatDialogRef<ModalReasignarTecnicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones) { 


    this.form.tecnico=data.tecnico_responsable;

 if (data) {
        this.id = data.id;
        this.tecnicosControl.setValue(data.id);

      } else {
        this.incluir = true;

     }

   }

  ngOnInit() {
  }
   registrar(){
   this.dialogRef.close(this.form);
   this.alert.registroExitoso();
  }

  actualizar(){
    this.dialogRef.close(this.form);
    this.alert.registroExitoso();
  }

}

  