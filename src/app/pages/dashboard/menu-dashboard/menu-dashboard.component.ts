import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { funciones } from '../../../../assets/funciones';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {

title =  'Directrices de NgBootstrap y demostración de componentes' ;  
  isAlertDisplayed =  true ; 
  user: any;
    

  constructor(public fun: funciones,public router: Router){
    this.user=fun.getLocal();
  }

  ngOnInit() {
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
