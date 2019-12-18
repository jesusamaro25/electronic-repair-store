import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-modal-notificaciones',
  templateUrl: 'notificaciones-modal.component.html',
  styleUrls: ['notificaciones-modal.component.css'],
})
export class ModalNotificacionesComponent {
  listNoti: any[] =  [];

  constructor(
    public dialogRef: MatDialogRef<ModalNotificacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
