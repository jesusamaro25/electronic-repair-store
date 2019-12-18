import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor(private router: Router) { }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit() {
  }

}
