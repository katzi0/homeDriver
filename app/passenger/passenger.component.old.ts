import { Component, OnInit, OnChanges } from '@angular/core';// SimpleChanges, Input
import { Passenger} from './passenger';
import { PassengerService } from './passenger.service';
import { EventsService } from '../events/events.service';


@Component({
  //  moduleId: module.id,
    selector: 'passenger-component',
    templateUrl: 'passenger.component.html',
    providers: [PassengerService,EventsService]
})

export class PassengerComponent implements OnInit { //,OnChanges
    passengers:Passenger[];
    passengerToSave: Passenger = new Passenger(null, "passenger to save");
    passengerID:number;
    currentPassengerLoggedIn: Passenger = new Passenger(null,"test");
    constructor(private passengerService:PassengerService, private EventsService:EventsService) { }
   

    ngOnInit() {
        this.passengerService.getPassengers().subscribe(data => this.passengers = data);
     }
    //  ngOnChanges(changes:SimpleChanges){
    //      console.log(changes.passengers);
    //  }
     savePassenger(){
        this.passengerService.savePassenger(this.passengerToSave)
        .subscribe(data => {
            console.log(data);
            this.passengerToSave = new Passenger(data.key,data.name);
            console.log(this.passengerToSave.name);
            this.passengerService.getPassengers().subscribe(data => this.passengers = data);
            });
     }
        getPassenger(){
            this.passengerService.getSepcificPassenger(this.passengerID).subscribe( data => this.currentPassengerLoggedIn = data);
            console.log("currentPassengerLoggedIn:" + this.currentPassengerLoggedIn);
        }
        getPassengerEvents(){
            this.EventsService.getEventsByPassengerID(this.passengerID).subscribe(data => {console.log(data)});
        }
}

