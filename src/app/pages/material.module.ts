import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { MaterialModule } from '../material';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import 'flatpickr/dist/flatpickr.css';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { OwlColorPickerModule } from 'owl-ng';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialRoutes } from './material.routing';
import { ListsComponent } from './lists/lists.component';
import { TabsComponent } from './tabs/tabs.component';
import { TablasComponent } from './tablas/tablas.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CrearSolicitudComponent } from './registrar-solicitud/crear-solicitud.component';
import { MenuDashboardComponent } from './dashboard/menu-dashboard/menu-dashboard.component';
import { CalendarComponent, ModalView } from './calendar/calendar.component';
import { PlanificacionComponent } from './planificacion/planificacion.component'
import localeEs from '@angular/common/locales/es';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

import { EvaluarSolicitudComponent } from './evaluar-solicitud/evaluar-solicitud.component';
import { ModalDetallesComponent } from './evaluar-solicitud/modal-detalles/modal-detalles.component';


import { DashboardJefeComponent } from './dashboard/dashboard-jefe/dashboard-jefe.component';
import { DashboardTecnicoComponent } from './dashboard/dashboard-tecnico/dashboard-tecnico.component';
import { DashboardClienteComponent } from './dashboard/dashboard-cliente/dashboard-cliente.component';
import { MenuPerfilComponent } from './perfil/menu-perfil/menu-perfil.component';
import { UsuarioPerfilComponent } from './perfil/usuario-perfil/usuario-perfil.component';
import { UsuarioEspecialidadComponent } from './perfil/usuario-especialidad/usuario-especialidad.component';
import { UsuarioPreferenciaComponent } from './perfil/usuario-preferencia/usuario-preferencia.component';
import { ModalContrasenaComponent } from './perfil/usuario-perfil/modal-contrasena/modal-contrasena.component';

import { EvaluarReclamoComponent } from './evaluar-reclamo/evaluar-reclamo.component';
import { ModalDetalleComponent } from './evaluar-reclamo/modal-detalle/modal-detalle.component';
import { ModalEspecialidadComponent } from './perfil/usuario-especialidad/modal-especialidad/modal-especialidad.component';

import { SolicitarServicioComponent } from './solicitar-servicio/solicitar-servicio.component';
registerLocaleData(localeEs);
import { EntregaEquipoComponent, ModalDetalleEntregaComponent, ModalDetalleGarantiaComponent } from './entrega-equipo/entrega-equipo.component';
import { ChartSolicitudesComponent } from './dashboard/dashboard-jefe/chart-solicitudes/chart-solicitudes.component';
import { ChartsModule } from 'ng2-charts';
import { ReporteEstructuradoComponent } from './reporte-estructurado/reporte-estructurado.component';
import { ReporteEstadisticoComponent } from './reporte-estadistico/reporte-estadistico.component';
import { RevisionEquiposComponent } from './revision-equipos/revision-equipos.component';
import { ModalDetallesRevisionComponent } from './revision-equipos/modal-detalles/modal-detalles.component';
import { ModalRevisionComponent } from './revision-equipos/modal-revision/modal-revision.component';
import { GenerarPresupuestoComponent } from './generar-presupuesto/generar-presupuesto.component';
import { ModalDetallesGPresupuestoComponent } from './generar-presupuesto/modal-detalles-g-presupuesto/modal-detalles-g-presupuesto.component';
import { ModalGPresupuestoComponent } from './generar-presupuesto/modal-g-presupuesto/modal-g-presupuesto.component';
import { RegistrarIncidenciaComponent } from './registrar-incidencia/registrar-incidencia.component';
import { ActividadServicioComponent } from './tablas/maestros/actividad-servicio/actividad-servicio.component';
import { CalificarServicioComponent } from './calificar-servicio/calificar-servicio.component';
import { ModalDetallesCalificarComponent } from './calificar-servicio/modal-detalles-calificar/modal-detalles-calificar.component';
import { ModalCalificarComponent } from './calificar-servicio/modal-calificar/modal-calificar.component';
import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { EquiposReparacionComponent } from './equipos-reparacion/equipos-reparacion.component';
import { ModalDetallesEquipoReparacionComponent } from './equipos-reparacion/modal-detalles-equipo-reparacion/modal-detalles-equipo-reparacion.component';
import { ModalTimelineEquiposReparacionComponent } from './equipos-reparacion/modal-timeline-equipos-reparacion/modal-timeline-equipos-reparacion.component';
import { AgendaEquiposReparacionComponent } from './equipos-reparacion/agenda-equipos-reparacion/agenda-equipos-reparacion.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { EvaluarComentariosComponent } from './evaluar-comentarios/evaluar-comentarios.component';
import { CrearPromocionComponent } from './crear-promocion/crear-promocion.component';
import { CrearReclamosComponent } from './crear-reclamos/crear-reclamos.component';
import { ReagendarComponent } from './registrar-incidencia/reagendar/reagendar.component';
import { TabReclamoComponent } from './crear-reclamos/tab-reclamo/tab-reclamo.component';
import { TabServicioComponent } from './crear-reclamos/tab-servicio/tab-servicio.component';
import { ModalDetallesGarantiaComponent } from './crear-reclamos/tab-servicio/modal-detalles-garantia/modal-detalles-garantia.component';
import { ModalCrearGarantiaComponent } from './crear-reclamos/tab-servicio/modal-crear-garantia/modal-crear-garantia.component';
import { ModalDetalleReclamoComponent } from './crear-reclamos/tab-reclamo/modal-detalle-reclamo/modal-detalle-reclamo.component';
import { ModalUsuarioPreferenciaComponent } from './perfil/usuario-preferencia/modal-usuario-preferencia/modal-usuario-preferencia.component';
import { ModalComentarioComponent } from './comentarios/modal-comentario/modal-comentario.component';
import { VerCalificacionComponent } from './ver-calificacion/ver-calificacion.component';
import { ModalDetalleCalificacionComponent } from './ver-calificacion/modal-detalle-calificacion/modal-detalle-calificacion.component';
import { ModalCalificacionComponent } from './ver-calificacion/modal-calificacion/modal-calificacion.component';
import { ReasignarTecnicoComponent } from './reasignar-tecnico/reasignar-tecnico.component';
import { ModalDetallesTecnicoComponent } from './reasignar-tecnico/modal-detalles-tecnico/modal-detalles-tecnico.component';
import { ModalReasignarTecnicoComponent } from './reasignar-tecnico/modal-reasignar-tecnico/modal-reasignar-tecnico.component';
import { ReporteEstadisticoIngresosComponent } from './reporte-estadistico/reporte-estadistico-ingresos/reporte-estadistico-ingresos.component';
import { ReporteEstadisticoTecnicosComponent } from './reporte-estadistico/reporte-estadistico-tecnicos/reporte-estadistico-tecnicos.component';
import { ReporteEstadisticoTiemposComponent } from './reporte-estadistico/reporte-estadistico-tiempos/reporte-estadistico-tiempos.component';
import { ReporteEstructuradoSolicitudComponent } from './reporte-estructurado/reporte-estructurado-solicitud/reporte-estructurado-solicitud.component';
import { ReporteEstructuradoClienteComponent } from './reporte-estructurado/reporte-estructurado-cliente/reporte-estructurado-cliente.component';
import { ReporteEstructuradoGarantiaComponent } from './reporte-estructurado/reporte-estructurado-garantia/reporte-estructurado-garantia.component';
import { ReporteEstructuradoIncidenciaComponent } from './reporte-estructurado/reporte-estructurado-incidencia/reporte-estructurado-incidencia.component';
import { ReporteEstructuradoReclamoComponent } from './reporte-estructurado/reporte-estructurado-reclamo/reporte-estructurado-reclamo.component';
import { ReporteEstructuradoRevisionComponent } from './reporte-estructurado/reporte-estructurado-revision/reporte-estructurado-revision.component';
import { ReporteEstadisticoServiciosComponent } from './reporte-estadistico/reporte-estadistico-servicios/reporte-estadistico-servicios.component';
import { RevisionReclamosComponent } from './revision-reclamos/revision-reclamos.component';
import { ModalDetallesReclamosComponent } from './revision-reclamos/modal-detalles-reclamos/modal-detalles-reclamos.component';
import { ModalRevisionReclamosComponent } from './revision-reclamos/modal-revision-reclamos/modal-revision-reclamos.component';
import { ServiciosReclamoComponent } from './servicios-reclamo/servicios-reclamo.component';
import { ModalDetalleServiciosReclamoComponent } from './servicios-reclamo/modal-detalle-servicios-reclamo/modal-detalle-servicios-reclamo.component';
import { ModalGenerarGarantiaComponent } from './entrega-equipo/modal-generar-garantia/modal-generar-garantia.component';
import { ModalCrearPromocionComponent } from './crear-promocion/modal-crear-promocion/modal-crear-promocion.component';
import { ModalPrimeraSolicitudComponent } from './solicitar-servicio/modal-primera-solicitud/modal-primera-solicitud.component';
import { DifundirPromocionComponent } from './difundir-promocion/difundir-promocion.component';
import { ModalDetallesIncidenciaComponent } from './dashboard/dashboard-tecnico/incidencias-tecnico/modal-detalles-inscidencia/modal-detalles-incidencia.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    ChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule,
    OwlColorPickerModule,
    SharedModule
  ],
  providers: [
    DatePipe,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'es' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-VE' }
  ],
  entryComponents: [
    ModalDetalleReclamoComponent,
    ModalDetallesGarantiaComponent,
    ModalCrearGarantiaComponent,
    ModalTimelineEquiposReparacionComponent,
    ModalDetallesEquipoReparacionComponent,
    ModalDetallesCalificarComponent,
    ModalCalificarComponent,
    ModalDetallesGPresupuestoComponent,
    ModalGPresupuestoComponent,
    ModalRevisionComponent,
    ModalDetallesRevisionComponent,
    ModalDetallesComponent,
    ModalContrasenaComponent,
    ModalView,
    ModalEspecialidadComponent,
    ModalUsuarioPreferenciaComponent,
    ModalComentarioComponent,
    ModalDetalleCalificacionComponent,
    ModalCalificacionComponent,
    ModalDetalleEntregaComponent,
    ModalComentarioComponent,
    ModalDetalleGarantiaComponent,
    ModalReasignarTecnicoComponent,
    ModalDetallesTecnicoComponent,
    ModalDetallesReclamosComponent,
    ModalRevisionReclamosComponent,
    ModalDetalleComponent,
    ModalDetalleServiciosReclamoComponent,
    ModalEspecialidadComponent,
    ModalGenerarGarantiaComponent,
    ModalCrearPromocionComponent,
    ModalPrimeraSolicitudComponent,
    ModalDetallesIncidenciaComponent
  ],

  declarations: [

    ModalDetallesRevisionComponent,
    ListsComponent,
    TabsComponent,
    TablasComponent,
    PerfilUsuarioComponent,
    CrearSolicitudComponent,
    CrearSolicitudComponent,
    MenuDashboardComponent,
    CalendarComponent,
    PlanificacionComponent,
    ConfiguracionComponent,
    EvaluarSolicitudComponent,
    ModalDetallesComponent,
    DashboardJefeComponent,
    DashboardTecnicoComponent,
    DashboardClienteComponent,
    ModalEspecialidadComponent,
    MenuPerfilComponent,
    UsuarioPerfilComponent,
    UsuarioEspecialidadComponent,
    UsuarioPreferenciaComponent,
    ModalContrasenaComponent,
    EvaluarReclamoComponent,
    ModalDetalleComponent,
    ModalView,
    SolicitarServicioComponent,
    EntregaEquipoComponent,
    ChartSolicitudesComponent,
    ReporteEstructuradoComponent,
    ReporteEstadisticoComponent,
    RevisionEquiposComponent,
    ModalRevisionComponent,
    GenerarPresupuestoComponent,
    ModalDetallesGPresupuestoComponent,
    ModalGPresupuestoComponent,
    RegistrarIncidenciaComponent,
    CalificarServicioComponent,
    ModalDetallesCalificarComponent,
    ModalCalificarComponent,
    EquiposReparacionComponent,
    ModalDetallesEquipoReparacionComponent,
    ModalTimelineEquiposReparacionComponent,
    AgendaEquiposReparacionComponent,
    ComentariosComponent,
    EvaluarComentariosComponent,
    CrearPromocionComponent,
    CrearReclamosComponent,
    ReagendarComponent,
    TabReclamoComponent,
    TabServicioComponent,
    ModalDetallesGarantiaComponent,
    ModalCrearGarantiaComponent,
    ModalDetalleReclamoComponent,
    UsuarioPreferenciaComponent,
    ModalUsuarioPreferenciaComponent,
    ModalComentarioComponent,
    VerCalificacionComponent,
    ModalDetalleCalificacionComponent,
    ModalCalificacionComponent,
    ModalDetalleEntregaComponent,
    ModalComentarioComponent,
    ModalDetalleGarantiaComponent,
    ReasignarTecnicoComponent,
    ModalDetallesTecnicoComponent,
    ModalReasignarTecnicoComponent,
    ReporteEstadisticoIngresosComponent,
    ReporteEstadisticoTecnicosComponent,
    ReporteEstadisticoTiemposComponent,
    ReporteEstructuradoSolicitudComponent,
    ReporteEstructuradoClienteComponent,
    ReporteEstructuradoGarantiaComponent,
    ReporteEstructuradoIncidenciaComponent,
    ReporteEstructuradoReclamoComponent,
    ReporteEstructuradoRevisionComponent,
    ReporteEstadisticoServiciosComponent,
    RevisionReclamosComponent,
    ModalDetallesReclamosComponent,
    ModalRevisionReclamosComponent,
    ServiciosReclamoComponent,
    ModalDetalleServiciosReclamoComponent,
    UsuarioEspecialidadComponent,
    ModalEspecialidadComponent,
    ModalGenerarGarantiaComponent,
    ModalCrearPromocionComponent,
    ModalPrimeraSolicitudComponent,
    DifundirPromocionComponent,
    ModalDetallesIncidenciaComponent
 ]
})
export class MaterialComponentsModule { }
