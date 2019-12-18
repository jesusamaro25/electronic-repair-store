import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent implements OnInit {

  constructor(private router: Router) { }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit() {
  }

}
