import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestrosRoutingModule } from './maestros-routing.module';
import { MaterialModule } from '../../../material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TipoEquipoComponent } from './tipo-equipo/tipo-equipo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalTipoEquipoComponent } from './tipo-equipo/modal/modal-tipo-equipo.component';
import { ModeloEquipoComponent } from './modelo-equipo/modelo-equipo.component';
import { ModalModeloEquipoComponent } from './modelo-equipo/modal-modelo-equipo/modal-modelo-equipo.component';
import { MarcaEquipoComponent } from './marca-equipo/marca-equipo.component';
import { ModalMarcaEquipoComponent } from './marca-equipo/modal-marca-equipo/modal-marca-equipo.component';
import { TipoReclamoComponent } from './tipo-reclamo/tipo-reclamo.component';
import { ModalReclamoComponent } from './tipo-reclamo/modal-reclamo/modal-reclamo.component';
import { CondicionesGarantiaComponent } from './condiciones-garantia/condiciones-garantia.component';
import { ModalCondicionesGarantiaComponent } from './condiciones-garantia/modal-condiciones-garantia/modal-condiciones-garantia.component';
import { TipoServicioComponent } from './tipo-servicio/tipo-servicio.component';
import { CategoriaEquipoComponent } from './categoria-equipo/categoria-equipo.component';
import { TipoCaracteristicaComponent } from './tipo-caracteristica/tipo-caracteristica.component';
import { ActividadServicioComponent } from './actividad-servicio/actividad-servicio.component';
import { CaracteristicasClienteComponent } from './caracteristicas-cliente/caracteristicas-cliente.component';
import { ModalTipoComentarioComponent } from './tipo-comentario/modal-tipo-comentario/modal-tipo-comentario.component';
import { DescuentoPromocionComponent } from './descuento-promocion/descuento-promocion.component';
import { BloquesAgendaComponent } from './bloques-agenda/bloques-agenda.component';
import { ServicioCaracteristicasComponent } from './servicio-caracteristicas/servicio-caracteristicas.component';
import { TipoIncidenciaComponent } from './tipo-incidencia/tipo-incidencia.component';
import { TipoComentarioComponent } from './tipo-comentario/tipo-comentario.component';
import { ModalTipoServicioComponent } from './tipo-servicio/modal/modal-tipo-servicio.component';
import { ModalCategoriaEquipoComponent } from './categoria-equipo/modal/modal-categoria-equipo.component';
import { ModalCaracteristicasClienteComponent } from './caracteristicas-cliente/modal-caracteristicas-cliente/modal-caracteristicas-cliente.component';
import { ModalTipoCaracteristicaComponent } from './tipo-caracteristica/modal-tipo-caracteristica/modal-tipo-caracteristica.component';
import { ModalBloquesAgendaComponent } from './bloques-agenda/modal/modal-bloques-agenda.component';
import { ModalActividadPorServicioComponent } from './actividad-servicio/modal-actividad-por-servicio/modal-actividad-por-servicio.component';
import { ModalDescuentoPromocionComponent } from './descuento-promocion/modal-descuento-promocion/modal-descuento-promocion.component';
import { CatalogoServicioComponent } from './catalogo-servicio/catalogo-servicio.component';
import { ModalCatalogoServicioComponent } from './catalogo-servicio/modal-catalogo-servicio/modal-catalogo-servicio.component';
import { PreguntaCalificacionComponent } from './pregunta-calificacion/pregunta-calificacion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ModalRegistroUsuarioComponent } from './registro-usuario/modal-registro-usuario/modal-registro-usuario.component';
import { ModalServicioCaracteristicasComponent } from './servicio-caracteristicas/modal-servicio-caracteristicas/modal-servicio-caracteristicas.component';
import { ModalTipoIncidenciaComponent } from './tipo-incidencia/modal-tipo-incidencia/modal-tipo-incidencia.component';
import { MotivoRechazoComponent } from './motivo-rechazo/motivo-rechazo.component';
import { ModalMotivoRechazoComponent } from './motivo-rechazo/modal-motivo-rechazo/modal-motivo-rechazo.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { ModalRegistroClienteComponent } from './registro-cliente/modal-registro-cliente/modal-registro-cliente.component';
import { ModalPreguntaCalificacionComponent } from './pregunta-calificacion/modal-pregunta-calificacion/modal-pregunta-calificacion.component';
import { DuracionGarantiaComponent } from './duracion-garantia/duracion-garantia.component';
import { ModalDuracionGarantiaComponent } from './duracion-garantia/modal-duracion-garantia/modal-duracion-garantia.component';

@NgModule({
  imports: [
    CommonModule,
    MaestrosRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TipoEquipoComponent,
    ModalTipoEquipoComponent,
    ModeloEquipoComponent,
    ModalModeloEquipoComponent,
    MarcaEquipoComponent,
    ModalMarcaEquipoComponent,
    TipoReclamoComponent,
    ModalReclamoComponent,
    CondicionesGarantiaComponent,
    ModalCondicionesGarantiaComponent,
    TipoServicioComponent,
    CategoriaEquipoComponent,
    TipoCaracteristicaComponent,
    ActividadServicioComponent,
    CaracteristicasClienteComponent,
    TipoComentarioComponent,
    ModalTipoComentarioComponent,
    DescuentoPromocionComponent,
    BloquesAgendaComponent,
    ServicioCaracteristicasComponent,
    TipoIncidenciaComponent,
    TipoComentarioComponent,
    ModalCategoriaEquipoComponent,
    ModalTipoServicioComponent,
    ModalCaracteristicasClienteComponent,
    ModalTipoCaracteristicaComponent,
    ModalBloquesAgendaComponent,
    ModalActividadPorServicioComponent,
    ModalDescuentoPromocionComponent,
    CatalogoServicioComponent,
    ModalCatalogoServicioComponent,
    PreguntaCalificacionComponent,
    RegistroUsuarioComponent,
    ModalRegistroUsuarioComponent,
    ModalServicioCaracteristicasComponent,
    ModalTipoIncidenciaComponent,
    TipoIncidenciaComponent,
    MotivoRechazoComponent,
    ModalMotivoRechazoComponent,
    RegistroClienteComponent,
    ModalRegistroClienteComponent,
    ModalPreguntaCalificacionComponent,
    DuracionGarantiaComponent,
    ModalDuracionGarantiaComponent,
  ],
  entryComponents: [
    ModalCatalogoServicioComponent,
    ModalTipoEquipoComponent,
    ModalModeloEquipoComponent,
    ModalMarcaEquipoComponent,
    ModalReclamoComponent,
    ModalCondicionesGarantiaComponent,
    ModalTipoComentarioComponent,
    ModalTipoServicioComponent,
    ModalCategoriaEquipoComponent,
    ModalCaracteristicasClienteComponent,
    ModalTipoCaracteristicaComponent,
    ModalBloquesAgendaComponent,
    ModalActividadPorServicioComponent,
    ModalDescuentoPromocionComponent,
    ModalRegistroUsuarioComponent,
    ModalServicioCaracteristicasComponent,
    ModalTipoIncidenciaComponent,
    ModalMotivoRechazoComponent,
    ModalRegistroClienteComponent,
    ModalPreguntaCalificacionComponent,
    ModalDuracionGarantiaComponent
  ]
})

export class MaestrosModule { }
