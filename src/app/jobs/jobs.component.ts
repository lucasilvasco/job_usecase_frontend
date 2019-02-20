import { Component, OnInit } from '@angular/core';
import { Job } from './job/job.model';
import { JobService } from './jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit {

  jobs: Job[]

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobService.jobs().subscribe(jobs => this.jobs = jobs)
  }

  removeJob(id: number) {
    this.jobService.delete(id).subscribe(response => this.ngOnInit())
  }

}
