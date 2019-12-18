import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ServiciosTecnicoComponent } from './dashboard-tecnico/servicios-tecnico/servicios-tecnico.component';
import { ModalDetallesComponent } from './dashboard-tecnico/servicios-tecnico/modal-detalles/modal-detalles.component';
import { PresupuestosComponent } from './dashboard-cliente/presupuestos/presupuestos.component';
import { TareasTecnicoComponent } from './dashboard-tecnico/tareas-tecnico/tareas-tecnico.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgendaServicioComponent } from './dashboard-tecnico/servicios-tecnico/agenda-servicio/agenda-servicio.component';
import { ChartsModule } from 'ng2-charts';
import { SolicitudesClienteComponent } from './dashboard-cliente/solicitudes-cliente/solicitudes-cliente.component';
import { ModalDetallesSolicitudesComponent } from './dashboard-cliente/solicitudes-cliente/modal-detalles-solicitudes/modal-detalles-solicitudes.component';
import { ModalTimelineSolicitudesComponent } from './dashboard-cliente/solicitudes-cliente/modal-timeline-solicitudes/modal-timeline-solicitudes.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalDetallesEvapresuComponent } from './dashboard-cliente/presupuestos/modal-detalles-evapresu/modal-detalles-evapresu.component';
import { ModalPresuComponent } from './dashboard-cliente/presupuestos/modal-presu/modal-presu.component';
import { IncidenciasTecnicoComponent } from './dashboard-tecnico/incidencias-tecnico/incidencias-tecnico.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ServiciosTecnicoComponent,
    ModalDetallesComponent,
    PresupuestosComponent,
    TareasTecnicoComponent,
    AgendaServicioComponent,
    SolicitudesClienteComponent,
    ModalDetallesSolicitudesComponent,
    ModalTimelineSolicitudesComponent,
    ModalDetallesEvapresuComponent,
    ModalPresuComponent,
    IncidenciasTecnicoComponent
  ],
  entryComponents:[
    ModalDetallesComponent,
    ModalDetallesSolicitudesComponent,
    ModalTimelineSolicitudesComponent,
    ModalDetallesEvapresuComponent,
    ModalPresuComponent
  ]
})
export class DashboardModule { }
