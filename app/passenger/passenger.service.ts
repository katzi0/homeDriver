import { Injectable } from '@angular/core';
import { passengers } from './mock-passengers';
import { Passenger } from './passenger';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//RXJS stuff
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PassengerService {

   
   constructor(private http: Http){}

    getPassengers() {
       return this.http.get(`http://localhost:50751/api/Passenger/`)
        .map((res:Response) => res.json());
    }
    getSepcificPassenger(passengerID) {
       return this.http.get(`http://localhost:50751/api/Passenger/` + passengerID)
        .map((res:Response) => res.json());
    }
    savePassenger(passenger:Passenger) {
        // var passengerToSave: Passenger = {
        //     id: null,
        //     name: "shai"
        // }
              
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         return this.http.post('http://localhost:50751/api/Passenger/',passenger,headers)
         .map((res:Response) => res.json());
    }

}