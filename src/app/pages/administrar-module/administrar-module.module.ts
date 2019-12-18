import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrarModuleRoutingModule } from './administrar-module-routing.module';
import { MenuAdministrarComponent } from './menu-administrar/menu-administrar.component';
import { MaterialModule } from '../../material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensajeCalificarComponent } from './mensaje-calificar/mensaje-calificar.component';
import { MensajePrimeraSolicitudComponent } from './mensaje-primera-solicitud/mensaje-primera-solicitud.component';
import { CorreoRegistroComponent } from './correo-registro/correo-registro.component';
import { CorreoPromocionComponent } from './correo-promocion/correo-promocion.component';
import { SolicitudAprobadaComponent } from './solicitud-aprobada/solicitud-aprobada.component';
import { SolicitudRechazadaComponent } from './solicitud-rechazada/solicitud-rechazada.component';
import { RevisionRealizadaComponent } from './revision-realizada/revision-realizada.component';
import { PresupuestoGeneradoComponent } from './presupuesto-generado/presupuesto-generado.component';
import { RetirarEquipoComponent } from './retirar-equipo/retirar-equipo.component';
import { ReclamoAprobadoComponent } from './reclamo-aprobado/reclamo-aprobado.component';
import { ReclamoRechazadoComponent } from './reclamo-rechazado/reclamo-rechazado.component';
import { RevisionReclamoRealizadaComponent } from './revision-reclamo-realizada/revision-reclamo-realizada.component';
import { ServicioAsignadoComponent } from './servicio-asignado/servicio-asignado.component';
import { ReclamoAsignadoComponent } from './reclamo-asignado/reclamo-asignado.component';

@NgModule({
  imports: [
    CommonModule,
    AdministrarModuleRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MenuAdministrarComponent,
    MensajeCalificarComponent,
    MensajePrimeraSolicitudComponent,
    CorreoRegistroComponent,
    CorreoPromocionComponent,
    SolicitudAprobadaComponent,
    SolicitudRechazadaComponent,
    RevisionRealizadaComponent,
    PresupuestoGeneradoComponent,
    RetirarEquipoComponent,
    ReclamoAprobadoComponent,
    ReclamoRechazadoComponent,
    RevisionReclamoRealizadaComponent,
    ServicioAsignadoComponent,
    ReclamoAsignadoComponent
  ]
})
export class AdministrarModuleModule { }
