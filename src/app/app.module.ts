import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { MatPaginatorIntl } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { funciones } from '../assets/funciones';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { ModalNotificacionesComponent } from './layouts/full/notificaciones-modal/notifiaciones-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    LoginComponent,
    ModalNotificacionesComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    AgGridModule.withComponents([])
  ],
  entryComponents:[
    ModalNotificacionesComponent
  ]
  ,
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    { provide: MatPaginatorIntl,
      useClass: AppComponent
    },
    funciones
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
