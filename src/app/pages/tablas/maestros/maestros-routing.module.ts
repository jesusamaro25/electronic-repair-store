import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoEquipoComponent } from './tipo-equipo/tipo-equipo.component';
import { ModeloEquipoComponent } from './modelo-equipo/modelo-equipo.component';
import { MarcaEquipoComponent } from './marca-equipo/marca-equipo.component';
import { TipoReclamoComponent } from './tipo-reclamo/tipo-reclamo.component';
import { CondicionesGarantiaComponent } from './condiciones-garantia/condiciones-garantia.component';
import { TipoServicioComponent } from './tipo-servicio/tipo-servicio.component';
import { CategoriaEquipoComponent } from './categoria-equipo/categoria-equipo.component';
import { TipoCaracteristicaComponent } from './tipo-caracteristica/tipo-caracteristica.component';
import { ActividadServicioComponent } from './actividad-servicio/actividad-servicio.component';
import { CaracteristicasClienteComponent } from './caracteristicas-cliente/caracteristicas-cliente.component';
import { DescuentoPromocionComponent } from './descuento-promocion/descuento-promocion.component';
import { BloquesAgendaComponent } from './bloques-agenda/bloques-agenda.component';
import { ServicioCaracteristicasComponent } from './servicio-caracteristicas/servicio-caracteristicas.component';
import { TipoIncidenciaComponent } from './tipo-incidencia/tipo-incidencia.component';
import { TipoComentarioComponent } from './tipo-comentario/tipo-comentario.component';
import { CatalogoServicioComponent } from './catalogo-servicio/catalogo-servicio.component';
import { PreguntaCalificacionComponent } from './pregunta-calificacion/pregunta-calificacion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { MotivoRechazoComponent } from './motivo-rechazo/motivo-rechazo.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { DuracionGarantiaComponent } from './duracion-garantia/duracion-garantia.component';


const routes: Routes = [

  {
    path:'tipo-equipo',
    component: TipoEquipoComponent
  },
  {
    path:'marca-equipo',
    component: MarcaEquipoComponent
  },
  {
    path:'modelo-equipo',
    component: ModeloEquipoComponent
  },
  {
    path:'tipo-reclamo',
    component: TipoReclamoComponent
  },
  {
    path:'condiciones-garantia',
    component: CondicionesGarantiaComponent
  },
  {
    path:'tipo-servicio',
    component: TipoServicioComponent
  },
  {
    path:'categoria-equipo',
    component: CategoriaEquipoComponent
  },
  {
    path:'tipo-caracteristica',
    component: TipoCaracteristicaComponent
  },
  {
    path:'tipo-comentario',
    component: TipoComentarioComponent
  },
  {
    path:'actividad-servicio',
    component: ActividadServicioComponent
  },
  {
    path:'caracteristicas-cliente',
    component:CaracteristicasClienteComponent
  },
  {
    path:'descuento-promocion',
    component:DescuentoPromocionComponent
  },
  {
    path:'bloques-agenda',
    component:BloquesAgendaComponent
  },
  {
    path:'servicios-caracteristica',
    component:ServicioCaracteristicasComponent
  },
  {
    path:'tipo-incidencia',
    component:TipoIncidenciaComponent
  },
  {
    path:'tipo-comentario',
    component:TipoComentarioComponent
  },
  {
    path:'catalogo-servicios',
    component:CatalogoServicioComponent
  },
  {
    path:'pregunta-calificacion',
    component:PreguntaCalificacionComponent
  },
  {
    path:'registro-usuario',
    component: RegistroUsuarioComponent
  },
  {
    path:'motivo-rechazo',
    component:MotivoRechazoComponent
  },
  {
    path:'registro-cliente',
    component: RegistroClienteComponent
  },
  {
    path:'duracion-garantia',
    component: DuracionGarantiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestrosRoutingModule { }
