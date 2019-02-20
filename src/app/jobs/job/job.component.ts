import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Job } from './job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html'
})
export class JobComponent implements OnInit {

  @Input() job: Job
  @Output() removeJob = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  emitRemoveJob(id: number) {
    this.removeJob.emit(id)
  }
}
