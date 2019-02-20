import { Injectable } from "@angular/core"
import { Http, RequestOptions, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Job } from './job/job.model';
import { Observable } from 'rxjs';

@Injectable()
export class JobService {

    constructor(private http: Http){}

    jobs(): Observable<Job[]> {
        return this.http.get(`http://localhost:8080/jobs`)
        .map(response => response.json())
    }

    delete(id: number):Observable<any> {
        let body = JSON.stringify({"id": id});
        let options = new RequestOptions({body : body, headers: new Headers({'Content-Type': 'application/json'})});
        return this.http.delete(`http://localhost:8080/jobs`, options)
    }
}