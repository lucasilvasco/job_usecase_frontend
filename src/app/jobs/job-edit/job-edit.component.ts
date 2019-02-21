import { Component, OnInit } from '@angular/core';
import { Job } from '../job/job.model';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RadioOption } from 'src/app/shared/radio/radio-option.model';
import { JobService } from '../jobs.service';
import { DatePipe } from '@angular/common';


import { ActivatedRoute, Router } from '@angular/router';
import { JSONPBackend_ } from '@angular/http/src/backends/jsonp_backend';
import { Task } from '../job/task.model';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html'
})
export class JobEditComponent implements OnInit {

  job: Job = {}
  jobForm: FormGroup
  taskList: FormArray  
  numberPattern = /^[0-9]*$/
  
  jobsDependence: Job[] = [{}]
  active: RadioOption[] = [
    {label: "Ativo", value: true},
    {label: "Inativo", value: false}
  ]

  completed: RadioOption[] = [
    {label: "Ativo", value: true},
    {label: "Inativo", value: false}
  ]


  constructor(private jobService: JobService,
              private datePipe: DatePipe,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.jobService.getAllJobs().subscribe(jobs => this.jobsDependence = this.jobsDependence.concat(jobs))

    this.jobForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      active: this.formBuilder.control('', [Validators.required]),
      parentJob: this.formBuilder.control(''),
      tasks: this.formBuilder.array([]),
    });

    this.jobService.getJobById(this.activatedRoute.snapshot.params['id']).subscribe(job => {
      this.jobForm = this.formBuilder.group({
        id: job.id,
        name: this.formBuilder.control(job.name, [Validators.required, Validators.minLength(5)]),
        active: this.formBuilder.control(job.active, [Validators.required]),
        parentJob: this.formBuilder.control(job.parentJob),
        tasks: this.formBuilder.array(job.tasks.map(task => {

          return this.formBuilder.group({
            name: this.formBuilder.control(task.name,[Validators.required, Validators.minLength(5)]),
            weight: this.formBuilder.control(task.weight,[Validators.required, Validators.pattern(this.numberPattern)]),
            completed: this.formBuilder.control(task.completed,[Validators.required]),
            createdAt:this.formBuilder.control(this.datePipe.transform(new Date(),"yyyy-MM-dd")),
          })
        })),
      })
    })
  };
  
  updateJob(job: Job) {
    this.jobService.updateJob(job).subscribe(response => {
      if(response.statusText==="OK"){
        this.router.navigate(["/"])
      }
    })
  };
  
  

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
