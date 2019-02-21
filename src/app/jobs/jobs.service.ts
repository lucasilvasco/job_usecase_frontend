import { Injectable } from "@angular/core"
import { Http, RequestOptions, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Job } from './job/job.model';
import { Observable } from 'rxjs';
import { JOB_API } from '../app.api';

@Injectable()
export class JobService {

    constructor(private http: Http){}

    getAllJobs(search: string = ""): Observable<Job[]> {
        return this.http.get(`${JOB_API}/jobs/`, {params: {q: search}})
        .map(response => response.json())
    }

    getJobById(id: number): Observable<Job> {
        return this.http.get(`${JOB_API}/jobs/id/${id}`)
        .map(response => response.json())
    }

    removeJobById(id: number):Observable<any> {
        let body = JSON.stringify({"id": id});
        let options = new RequestOptions({body : body, headers: new Headers({'Content-Type': 'application/json'})});
        return this.http.delete(`${JOB_API}/jobs`, options)
    }

    createJob(job: Job): Observable<any>{
        let jobToCreate = job
        if(jobToCreate.parentJob===""){
            jobToCreate.parentJob = {}
        }
        let body = JSON.stringify(jobToCreate);
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
        return this.http.post(`${JOB_API}/jobs`, body, options)
    }

    updateJob(job: Job): Observable<any> {
        let jobToUpdate = job
        if(jobToUpdate.parentJob===""){
            jobToUpdate.parentJob = null
        }
        if(jobToUpdate.parentJob !== null){
            if(jobToUpdate.id === jobToUpdate.parentJob.id || jobToUpdate.parentJob.id===undefined){
                jobToUpdate.parentJob = null
            }

        }

        let body = JSON.stringify(jobToUpdate);
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
        return this.http.put(`${JOB_API}/jobs`, body, options)
    }
}