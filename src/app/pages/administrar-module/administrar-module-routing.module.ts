import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuAdministrarComponent } from './menu-administrar/menu-administrar.component';
import { MensajeCalificarComponent } from './mensaje-calificar/mensaje-calificar.component';
import { MensajePrimeraSolicitudComponent } from './mensaje-primera-solicitud/mensaje-primera-solicitud.component';
import { CorreoPromocionComponent } from './correo-promocion/correo-promocion.component';
import { CorreoRegistroComponent } from './correo-registro/correo-registro.component';
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

const routes: Routes = [
  {
    path:'administrar',
    component:MenuAdministrarComponent
  },
  {
    path:'mensaje-calificar',
    component:MensajeCalificarComponent
  },
  {
    path:'mensaje-primera-solicitud',
    component:MensajePrimeraSolicitudComponent
  },
  {
    path:'correo-promocion',
    component:CorreoPromocionComponent
  },
  {
    path:'correo-registro',
    component:CorreoRegistroComponent
  },
  {
    path:'solicitud-aprobada',
    component:SolicitudAprobadaComponent
  },
  {
    path:'solicitud-rechazada',
    component:SolicitudRechazadaComponent
  },
  {
    path:'revision-realizada',
    component:RevisionRealizadaComponent
  },
  {
    path:'presupuesto-generado',
    component:PresupuestoGeneradoComponent
  },
  {
    path:'retirar-equipo',
    component:RetirarEquipoComponent
  },
  {
    path:'reclamo-aprobado',
    component:ReclamoAprobadoComponent
  },
  {
    path:'reclamo-rechazado',
    component:ReclamoRechazadoComponent
  },
  {
    path:'revision-reclamo-realizada',
    component:RevisionReclamoRealizadaComponent
  },
  {
    path:'servicio-asignado',
    component:ServicioAsignadoComponent
  },
  {
    path:'reclamo-asignado',
    component:ReclamoAsignadoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarModuleRoutingModule { }
