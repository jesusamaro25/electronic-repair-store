import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionOpcionRoutingModule } from './configuracion-opcion-routing.module';
import { MaterialModule } from '../../../material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmpresaComponent } from './empresa/empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagenesWebComponent } from './imagenes-web/imagenes-web.component';
import { HorarioComponent } from './horario/horario.component';
import { RedesSocialesComponent } from './redes-sociales/redes-sociales.component';
import { MisionComponent } from './mision/mision.component';
import { ModalImagenesWebComponent } from './imagenes-web/modal-imagenes-web/modal-imagenes-web.component';
import { VisionComponent } from './vision/vision.component';
import { ValoresComponent } from './valores/valores.component';
import { ObjetivoComponent } from './objetivo/objetivo.component';
import { ModalObjetivoComponent } from './objetivo/modal-objetivo/modal-objetivo.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ModalPreguntasComponent } from './preguntas/modal-preguntas/modal-preguntas.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ModalServiciosComponent } from './servicios/modal-servicios/modal-servicios.component';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { ModalCaracteristicasComponent } from './caracteristicas/modal-caracteristicas/modal-caracteristicas.component';
import { CostoRevisionComponent } from './costo-revision/costo-revision.component';
import { PermisoRolComponent } from './permiso-rol/permiso-rol.component';
import { ModalPermisoRolComponent } from './permiso-rol/modal-permiso-rol/modal-permiso-rol.component';
import { RolesComponent } from './roles/roles.component';
import { DescargaAppComponent } from './descarga-app/descarga-app.component';
import { ModalRolesComponent } from './roles/modal/modal-roles.component';


import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { ModalTecnicosComponent } from './tecnicos/modal-tecnicos/modal-tecnicos.component';

@NgModule({
  declarations: [
    EmpresaComponent,
    ImagenesWebComponent,
    HorarioComponent,
    RedesSocialesComponent,
    MisionComponent,
    ModalImagenesWebComponent,
    VisionComponent,
    ValoresComponent,
    ObjetivoComponent,
    ModalObjetivoComponent,
    PreguntasComponent,
    ModalPreguntasComponent,
    ServiciosComponent,
    ModalServiciosComponent,
    CaracteristicasComponent,
    ModalCaracteristicasComponent,
    CostoRevisionComponent,
    PermisoRolComponent,
    ModalPermisoRolComponent,
    ModalPermisoRolComponent,
    RolesComponent,
    ModalRolesComponent,
    DescargaAppComponent,
    TecnicosComponent,
    ModalTecnicosComponent,
    ],
  imports: [
    CommonModule,
    ConfiguracionOpcionRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ModalImagenesWebComponent,
    ModalObjetivoComponent,
    ModalPreguntasComponent,
    ModalPermisoRolComponent,
    ModalTecnicosComponent,
    ModalServiciosComponent,
    ModalCaracteristicasComponent,
    ModalPermisoRolComponent,
    ModalRolesComponent
 ]
})
export class ConfiguracionOpcionModule { }
