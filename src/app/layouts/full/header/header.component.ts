import { Component } from '@angular/core';
import { funciones } from '../../../../assets/funciones';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  user: any;

  constructor(public fun: funciones,public router: Router){
    this.user=fun.getLocal();
  }

  logout(){

    this.fun.destroyLocal()
    this.router.navigate(['/']);

  }


}

