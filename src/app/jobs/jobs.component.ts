import { Component, OnInit } from '@angular/core';
import { Job } from './job/job.model';
import { JobService } from './jobs.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit {

  jobs: Job[] = []

  searchForm: FormGroup
  searchControl: FormControl
  constructor(private jobService: JobService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .switchMap(searchTerm =>
          this.jobService.getAllJobs(searchTerm))
      .subscribe(jobs => {
        console.log(this.jobs)
        this.jobs = jobs
      })

    this.jobService.getAllJobs().subscribe(jobs => this.jobs = jobs)
  }

    

  removeJob(id: number) {
    this.jobService.removeJobById(id).subscribe(response => this.ngOnInit())
  }
}
