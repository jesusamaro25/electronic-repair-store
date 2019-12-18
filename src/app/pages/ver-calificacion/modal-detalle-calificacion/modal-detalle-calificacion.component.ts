import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-modal-detalle-calificacion',
  templateUrl: './modal-detalle-calificacion.component.html',
  styleUrls: ['./modal-detalle-calificacion.component.css']
})
export class ModalDetalleCalificacionComponent implements OnInit {

  form = { 
    cliente_nombre:'',
    marca:'',
    modelo:'',
    fecha_entrega:'',
    problema:'',
    diagnostico:'',
    servicio:'',
    resultado:'',
    
    };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.form.cliente_nombre=data.cliente_nombre;
    this.form.marca         =data.marca_nombre;
    this.form.modelo        =data.modelo_nombre;
    this.form.fecha_entrega =data.fecha_entrega;
    this.form.problema      =data.problema;
    this.form.diagnostico   =data.diagnostico;
    this.form.servicio      =data.servicio_nombre;
    this.form.resultado     =data.resultado;
   
  }

  ngOnInit() {
  }

}
