import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { ImagenesWebComponent } from './imagenes-web/imagenes-web.component';
import { HorarioComponent } from './horario/horario.component';
import { RedesSocialesComponent } from './redes-sociales/redes-sociales.component';
import { MisionComponent } from './mision/mision.component';
import { VisionComponent } from './vision/vision.component';
import { ValoresComponent } from './valores/valores.component';
import { ObjetivoComponent } from './objetivo/objetivo.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { CostoRevisionComponent } from './costo-revision/costo-revision.component';
import { PermisoRolComponent } from './permiso-rol/permiso-rol.component';
import { RolesComponent } from './roles/roles.component';
import { DescargaAppComponent } from './descarga-app/descarga-app.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';

const routes: Routes = [
  {
    path: 'empresa',
    component: EmpresaComponent
  },
  {
    path: 'imagenes-web',
    component: ImagenesWebComponent
  },
  {
    path: 'horario',
    component: HorarioComponent
  },
  {
    path: 'redes-sociales',
    component: RedesSocialesComponent
  },
  {
    path: 'mision',
    component: MisionComponent
  },
  {
    path: 'vision',
    component: VisionComponent
  },
  {
    path: 'valores',
    component: ValoresComponent
  },
  {
    path: 'objetivo',
    component: ObjetivoComponent
  },
  {
    path: 'preguntas',
    component: PreguntasComponent
  },
  {
    path: 'servicios',
    component: ServiciosComponent
  },
  {
    path: 'caracteristicas',
    component: CaracteristicasComponent
  },
  {
    path: 'permiso-rol',
    component: PermisoRolComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'app-descarga',
    component: DescargaAppComponent
  },

  {
    path: 'tecnico',
    component: TecnicosComponent
  }
  ,
  {
    path: 'costo-revision',
    component: CostoRevisionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionOpcionRoutingModule { }
