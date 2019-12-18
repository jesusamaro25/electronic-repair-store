import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { funciones } from '../../../../../assets/funciones';

@Component({
  selector: 'app-modal-crear-garantia',
  templateUrl: './modal-crear-garantia.component.html',
  styleUrls: ['./modal-crear-garantia.component.css']
})
export class ModalCrearGarantiaComponent implements OnInit {

  form = { id:''};

  tipos:  any[]=[
    {
      id:'t1',
      nombre:'Nuevo Problema'
    },
    {
      id:'c1',
      nombre:'Persistencia del problema'
    }
  ];

  tipoControl = new FormControl('', [
    Validators.required
  ]);

  textoControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public dialogRef: MatDialogRef<ModalCrearGarantiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public alert: funciones) {
      this.form.id=data.id
    }

  ngOnInit() {
  }

  reclamo(){
    this.dialogRef.close();
    this.alert.okAlert("Reclamo Enviado");
  }

}
