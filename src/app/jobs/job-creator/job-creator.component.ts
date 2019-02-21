import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { RadioOption } from 'src/app/shared/radio/radio-option.model';
import { Job } from '../job/job.model';
import { JobService } from '../jobs.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-job-creator',
  templateUrl: './job-creator.component.html'
})
export class JobCreatorComponent implements OnInit {

  jobs: Job[] = [{}]
  jobForm: FormGroup
  active: RadioOption[] = [
    {label: "Ativo", value: true},
    {label: "Inativo", value: false}
  ]

  completed: RadioOption[] = [
    {label: "Ativo", value: true},
    {label: "Inativo", value: false}
  ]

  taskList: FormArray

  numberPattern = /^[0-9]*$/

  constructor(private jobService: JobService,
              private router: Router,
              private datePipe: DatePipe,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.jobService.getAllJobs().subscribe(jobs => this.jobs = this.jobs.concat(jobs))

    this.jobForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      active: this.formBuilder.control('', [Validators.required]),
      parentJob: this.formBuilder.control(''),
      tasks: this.formBuilder.array([]),
    })
  }

  createJob(job: Job) {
    this.jobService.createJob(job).subscribe(response => {
      if(response.statusText==="OK"){
        this.router.navigate(["/"])

      }
    })
  }

  createTask(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control('',[Validators.required, Validators.minLength(5)]),
      weight: this.formBuilder.control('',[Validators.required, Validators.pattern(this.numberPattern)]),
      completed: this.formBuilder.control('',[Validators.required]),
      createdAt:this.formBuilder.control(this.datePipe.transform(new Date(),"yyyy-MM-dd")),

    });
  }

  addTask() {
    this.taskList = this.jobForm.get('tasks') as FormArray;
    this.taskList.push(this.createTask());
  }
}