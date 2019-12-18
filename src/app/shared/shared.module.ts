import { NgModule } from '@angular/core';
import { RatingComponent } from './rating/rating.component';
import { MaterialModule } from '../material';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineReparacionComponent } from './timeline-reparacion/timeline-reparacion.component';


@NgModule({
  declarations: [
    RatingComponent,
    TimelineComponent,
    TimelineReparacionComponent,
  ],
  imports:[
    MaterialModule,
    CommonModule
  ],
  exports: [
    RatingComponent,
    TimelineComponent,
    TimelineReparacionComponent
   ],
  providers: [ ]
})
export class SharedModule { }
