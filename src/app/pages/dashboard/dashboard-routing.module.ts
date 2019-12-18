import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosTecnicoComponent } from './dashboard-tecnico/servicios-tecnico/servicios-tecnico.component';
import { PresupuestosComponent } from './dashboard-cliente/presupuestos/presupuestos.component';
import { TareasTecnicoComponent } from './dashboard-tecnico/tareas-tecnico/tareas-tecnico.component';
import { AgendaServicioComponent } from './dashboard-tecnico/servicios-tecnico/agenda-servicio/agenda-servicio.component';
import { SolicitudesClienteComponent } from './dashboard-cliente/solicitudes-cliente/solicitudes-cliente.component';
import { IncidenciasTecnicoComponent } from './dashboard-tecnico/incidencias-tecnico/incidencias-tecnico.component';


const routes: Routes = [
  {
    path:'servicios-tecnico',
    component: ServiciosTecnicoComponent
  },
  {
    path:'presupuestos',
    component: PresupuestosComponent
  },
  {
    path:'tareas-tecnico',
    component: TareasTecnicoComponent
  },
  {
    path:'agenda-servicio',
    component: AgendaServicioComponent
  },
  {
    path:'solicitudes-cliente',
    component: SolicitudesClienteComponent
  },
  {
    path:'incidencias-tecnico',
    component: IncidenciasTecnicoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
