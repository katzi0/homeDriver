import { Component, OnInit } from '@angular/core';
import { TripService } from './trip.service';
import { trip } from './trip';
import { driver } from '../driver/driver';
import { Passenger } from '../passenger/passenger';

@Component({
    // moduleId: module.id,
    selector: 'trip-component',
    templateUrl: 'trip.component.html',
    providers: [TripService]
})

export class TripComponent implements OnInit {
 trips:trip[];
    
    constructor(private tripService: TripService) { }

    ngOnInit() {
        this.tripService.getTrips().subscribe(data => this.trips = data);
        this.tripService.saveTrip().subscribe(data => {console.log(data);});
     }
}