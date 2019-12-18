import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { GeneralServiceService } from '../../../Services/general-service.service';
import { funciones } from '../../../../assets/funciones';

let preguntas: any[] = [];
@Component({
  selector: 'app-modal-calificar',
  templateUrl: './modal-calificar.component.html',
  styleUrls: ['./modal-calificar.component.css']
})
export class ModalCalificarComponent implements OnInit {

  orderForm: FormGroup;
  items: FormArray;

  formGroup: FormGroup;

  rating:number = 1;
  starCount:number = 5;
  resultado: any;
  datos: any;
  res: {};
  id: number;
  mensaje: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,
  public servicio: GeneralServiceService,public alert: funciones,public dialogRef: MatDialogRef<ModalCalificarComponent>) { 
    this.id=data.id;
  }

  preguntas:  any[]=[];

  ngOnInit() {

    this.servicio.getAll('mensaje/2').then((result: any) => {
      
      this.mensaje=result.data.descripcion;

    }, (err) => {
      console.log(err);
    });

    this.formGroup = new FormGroup({

      rating: new FormControl(1, [Validators.required]),
      desControl: new FormControl('', [Validators.required])

    })

    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });

    this.servicio.getAll('preguntaCalificacion').then((result) => {
      this.resultado = result;
      this.preguntas = [];
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          pregunta: this.resultado.data[i].descripcion
        };
        this.preguntas.push(this.datos);
      }

      for(var i=0;i<this.preguntas.length;i++){

        this.items = this.orderForm.get('items') as FormArray;
  
        this.items.push(
  
          this.formBuilder.group({
            id: this.preguntas[i].id,
            pregu: this.preguntas[i].pregunta,
            respuesta: ['', Validators.required]
          })
  
        );
  
      }

    }, (err) => {
      console.log(err);
    });

  }

  onRatingChanged(rating){
    this.rating = rating;
  }

  enviar(){
    
    for(var i=0;i<this.preguntas.length;i++){

      let array=this.orderForm.controls.items as FormArray
      let group=array.at(i) as FormGroup

      this.res ={
        "idPreguntaCalificacion":group.controls['id'].value,
        "respuesta":group.controls['respuesta'].value
      };

      preguntas.push(this.res)

    }

    const datos ={
      "puntaje":this.rating,
      "comentario":this.formGroup.get('desControl').value,
      "preguntas":preguntas
    };

    console.log(datos)

    this.servicio.postFormData(datos,"ordenServicio/"+this.id+"/calificacionServicio").then((result) => {
      this.alert.okAlert("Servicio Calificado");
      this.dialogRef.close(datos);
    }, (err) => {
      console.log(err);
    });
  }


}
