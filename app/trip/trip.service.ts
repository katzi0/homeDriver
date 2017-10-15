import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
//RXJS stuff
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { trip } from './trip';

import { driver } from '../driver/driver';
import { Passenger } from '../passenger/passenger';

@Injectable()
export class TripService {
    
    constructor(private http:Http) { }
        getTrips(){
            return this.http.get('http://localhost:50751/api/Trip/')
            .map((res:Response) => res.json());
     }
     saveTrip(){
        var passenger1: Passenger = new Passenger(1,"test");
        var arr: Array<Passenger> = [passenger1,passenger1];

        // var arr: Array<{id: number, name: string}> = [{id:null,name:"passenger1"},{id:null,name:"passenger1"}];
         var tripToSave: trip = 
         {
                id: null,
                tripDriver: new driver(null,"testdriver"),
                passsengers: arr,
                //Passsengers:"Test",
                startTime: new Date,
                endTime: new Date,
                tripDestination: "123",
                numOfSeats: 1
        }

    
         
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         return this.http.post('http://localhost:50751/api/Trip/',tripToSave,headers)
         .map((res:Response) => res.json());
     }
}