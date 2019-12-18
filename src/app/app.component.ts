import { Component } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends MatPaginatorIntl {

  itemsPerPageLabel = 'Nº de filas';//customize item per page label

  constructor() {
    super();
  }

}

