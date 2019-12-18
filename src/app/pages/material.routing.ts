import { Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { TabsComponent } from './tabs/tabs.component';
import { TablasComponent } from './tablas/tablas.component';
import { CrearSolicitudComponent } from './registrar-solicitud/crear-solicitud.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { MenuDashboardComponent } from './dashboard/menu-dashboard/menu-dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PlanificacionComponent } from './planificacion/planificacion.component';
import { EvaluarSolicitudComponent } from './evaluar-solicitud/evaluar-solicitud.component';
import { EvaluarReclamoComponent } from './evaluar-reclamo/evaluar-reclamo.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { MenuPerfilComponent } from './perfil/menu-perfil/menu-perfil.component';
import { SolicitarServicioComponent } from './solicitar-servicio/solicitar-servicio.component';
import { EntregaEquipoComponent } from './entrega-equipo/entrega-equipo.component';
import { ReporteEstructuradoComponent } from './reporte-estructurado/reporte-estructurado.component';
import { ReporteEstadisticoComponent } from './reporte-estadistico/reporte-estadistico.component';
import { RevisionEquiposComponent } from './revision-equipos/revision-equipos.component';
import { GenerarPresupuestoComponent } from './generar-presupuesto/generar-presupuesto.component';
import { RegistrarIncidenciaComponent } from './registrar-incidencia/registrar-incidencia.component';
import { CalificarServicioComponent } from './calificar-servicio/calificar-servicio.component';
import { EquiposReparacionComponent } from './equipos-reparacion/equipos-reparacion.component';
import { AgendaEquiposReparacionComponent } from './equipos-reparacion/agenda-equipos-reparacion/agenda-equipos-reparacion.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { EvaluarComentariosComponent } from './evaluar-comentarios/evaluar-comentarios.component';
import { CrearPromocionComponent } from './crear-promocion/crear-promocion.component';
import { CrearReclamosComponent } from './crear-reclamos/crear-reclamos.component';
import { ReagendarComponent } from './registrar-incidencia/reagendar/reagendar.component';
import { VerCalificacionComponent } from './ver-calificacion/ver-calificacion.component';
import { ReasignarTecnicoComponent } from './reasignar-tecnico/reasignar-tecnico.component';
import { RevisionReclamosComponent } from './revision-reclamos/revision-reclamos.component';
import { ServiciosReclamoComponent } from './servicios-reclamo/servicios-reclamo.component';
import { UsuarioEspecialidadComponent } from './perfil/usuario-especialidad/usuario-especialidad.component';
import { } from './perfil/usuario-especialidad/modal-especialidad/modal-especialidad.component';
import { DifundirPromocionComponent } from './difundir-promocion/difundir-promocion.component';
export const MaterialRoutes: Routes = [

  {
    path: 'dashboard',
    component: MenuDashboardComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'tablas',
    component: TablasComponent
  },
  {
    path: 'registrar-solicitud',
    component: CrearSolicitudComponent
  },
  {
    path: 'perfil-usuario',
    component: PerfilUsuarioComponent,
  },
  {
    path: 'calendario',
    component: CalendarComponent,
  },
  {
    path: 'agendar',
    component: PlanificacionComponent,
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent
  },
  {
    path: 'evaluar-solicitud',
    component: EvaluarSolicitudComponent,
  },
  {
    path: 'evaluar-reclamo',
    component: EvaluarReclamoComponent
  },
  {
    path: 'menu-perfil',
    component: MenuPerfilComponent
  },
  {
    path: 'solicitar-servicio',
    component: SolicitarServicioComponent
  },
  {
    path: 'entrega-equipo',
    component: EntregaEquipoComponent
  },
  {
    path: 'revision-equipos',
    component: RevisionEquiposComponent
  },
  {
    path: 'generar-presupuesto',
    component: GenerarPresupuestoComponent
  },
  {
    path: 'registrar-incidencia',
    component: RegistrarIncidenciaComponent
  },
  {
    path: 'reagendar',
    component: ReagendarComponent
  },
  {
    path: 'calificar-servicio',
    component: CalificarServicioComponent
  },
  {
    path: 'equipos-reparacion',
    component: EquiposReparacionComponent
  },
  {
    path: 'agenda-equipo-reparacion',
    component: AgendaEquiposReparacionComponent
  },
  {
    path: 'comentarios',
    component: ComentariosComponent
  },
  {
    path: 'evaluar-comentarios',
    component: EvaluarComentariosComponent
  },
  {
    path: 'crear-promocion',
    component: CrearPromocionComponent
  },
  {
    path: 'crear-reclamo',
    component: CrearReclamosComponent
  },
  {
    path: 'ver-calificacion',
    component: VerCalificacionComponent
  },
  {
    path: 'reasignar-tecnico',
    component: ReasignarTecnicoComponent
  },
  {
    path: 'servicios-reclamo',
    component: ServiciosReclamoComponent
  },
  {
    path: '',
    loadChildren: './tablas/maestros/maestros.module#MaestrosModule'
  },
  {
    path: '',
    loadChildren: './configuracion/configuracion-opcion/configuracion-opcion.module#ConfiguracionOpcionModule'
  },
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'revision-reclamos',
    component: RevisionReclamosComponent

  },
  {
    path: 'reporte-estructurado',
    component: ReporteEstructuradoComponent
  },
  {
    path: 'reporte-estadistico',
    component: ReporteEstadisticoComponent
  },
  {
    path: 'usuario-especialidad',
    component: UsuarioEspecialidadComponent,
  },
  {
    path: 'difundir',
    component: DifundirPromocionComponent,
  },
  {
    path: '',
    loadChildren: './administrar-module/administrar-module.module#AdministrarModuleModule'
  },
];
