import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GeneralServiceService } from '../../../../../Services/general-service.service';

@Component({
  selector: 'app-modal-detalles-evapresu',
  templateUrl: './modal-detalles-evapresu.component.html',
  styleUrls: ['./modal-detalles-evapresu.component.css']
})
export class ModalDetallesEvapresuComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public servicio: GeneralServiceService) { }

  ngOnInit() {
  }

}
