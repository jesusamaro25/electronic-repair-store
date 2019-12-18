import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-administrar',
  templateUrl: './menu-administrar.component.html',
  styleUrls: ['./menu-administrar.component.css']
})
export class MenuAdministrarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
