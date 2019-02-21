import { Injectable } from "@angular/core"
import { Http, RequestOptions, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Job } from './job/job.model';
import { Observable } from 'rxjs';

@Injectable()
export class JobService {

    constructor(private http: Http){}

    getAllJobs(search?: string): Observable<Job[]> {
        return this.http.get(`http://localhost:8080/jobs`, {params: {q: search}})
        .map(response => response.json())
    }

    getJobById(id: number): Observable<Job> {
        return this.http.get(`http://localhost:8080/jobs/${id}`)
        .map(response => response.json())
    }

    removeJobById(id: number):Observable<any> {
        let body = JSON.stringify({"id": id});
        let options = new RequestOptions({body : body, headers: new Headers({'Content-Type': 'application/json'})});
        return this.http.delete(`http://localhost:8080/jobs`, options)
    }

    createJob(job: Job): Observable<any>{
        let jobToCreate = job
        if(jobToCreate.parentJob===""){
            jobToCreate.parentJob = {}
        }
        let body = JSON.stringify(jobToCreate);
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
        return this.http.post(`http://localhost:8080/jobs`, body, options)
    }

    updateJob(job: Job): Observable<any> {
        let jobToCreate = job
        if(jobToCreate.parentJob==="" || jobToCreate.parentJob.id===undefined){
            jobToCreate.parentJob = null
        }
        console.log(jobToCreate)
        let body = JSON.stringify(jobToCreate);
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
        return this.http.put(`http://localhost:8080/jobs`, body, options)
    }
}