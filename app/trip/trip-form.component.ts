import { Component, OnInit } from '@angular/core';
import { trip } from './trip';
import { TripService } from './trip.service';
@Component({
    // moduleId: module.id,
    selector: 'trip-form',
    templateUrl: 'trip-form.component.html',
    providers: [TripService]
})

export class TripFormComponent {
   numOfSeats = [4,5,6,7,8];
   tripToSave: trip;
   result:any;
   //sampleDate: Date = Date.UTC();
 //  modal = new trip(null,null,null,"HADERA", 3);
   submitted = false;

    constructor(private tripService: TripService) { }
 
   onSubmit()  {
   //    this.tripToSave = this.modal;
       this.submitted = false;
     //  this.tripService.saveTrip(this.tripToSave).subscribe(data => this.result = data );
};
}