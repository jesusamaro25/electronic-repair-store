import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../../assets/funciones';

@Component({
  selector: 'app-modal-reclamo',
  templateUrl: './modal-reclamo.component.html',
  styleUrls: ['./modal-reclamo.component.css']
})
export class ModalReclamoComponent implements OnInit {

  datos = { nombre: '',estatus: 'A' };
  incluir: boolean = false;
  id: string;

  nombreControl = new FormControl('', [
    Validators.required
  ]);
  
  constructor(public dialogRef: MatDialogRef<ModalReclamoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones) { 

      if (data) {
        this.id = data.id;
        this.nombreControl.setValue(data.nombre);
      } else {
        this.incluir = true;
      }

    }

  ngOnInit() {
  }
  registrar(){
    this.dialogRef.close(this.datos);
    this.alert.registroExitoso();
  }

  actualizar(){
    this.dialogRef.close(this.datos);
    this.alert.registroExitoso();
  }

}
