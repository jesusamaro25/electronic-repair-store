import { Component, OnInit } from '@angular/core';
import { funciones } from '../../../../assets/funciones';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-perfil',
  templateUrl: './menu-perfil.component.html',
  styleUrls: ['./menu-perfil.component.css']
})
export class MenuPerfilComponent implements OnInit {
  
  user: any;

  constructor(public fun: funciones,public router: Router){
    this.user=fun.getLocal();
  }

  ngOnInit() {
  }

}
