import { Injectable } from '@angular/core';
import { driver } from './driver';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//RXJS stuff
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class driverService {
   constructor(private http: Http){}

    getdrivers() {
       return this.http.get(`http://localhost:50751/api/driver/`)
        .map((res:Response) => res.json());
    }
    getSepcificdriver() {
       return this.http.get(`http://localhost:50751/api/driver/5`)
        .map((res:Response) => res.json());
    }
    saveDriver(driver:driver) {

              
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         return this.http.post('http://localhost:50751/api/Driver/',driver,headers)
         .map((res:Response) => res.json());
    }

}