import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-reparacion',
  templateUrl: './timeline-reparacion.component.html',
  styleUrls: ['./timeline-reparacion.component.css']
})
export class TimelineReparacionComponent implements OnInit {

  @Input() timeEntryHeader: string;
  @Input() timeEntryContent: string;
  @Input() timeEntryPlace: string;
  @Input() timeEntryState: string;

  constructor() { }

  ngOnInit() {
  }

}
