import { Component, OnInit, OnChanges } from '@angular/core';// SimpleChanges, Input
 import { Passenger} from './passenger';
import { PassengerService } from './passenger.service';
import { EventsService } from '../events/events.service';

import { AngularFirestore,AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Item { name: string;}
export interface ItemId extends Item { id: string; }

@Component({
  //  moduleId: module.id,
    selector: 'passenger-component',
    templateUrl: 'passenger.component.html',
    providers: [PassengerService,EventsService]
})

export class PassengerComponent implements OnInit { 
    private passenegerCollection:AngularFirestoreCollection<Item>;
    private loggedInPassenger:AngularFirestoreCollection<Item>;

    passengers:Observable<ItemId[]>;
    // items:Observable<ItemId[]>;
    passengerToSave:Passenger = new Passenger(0, "passenger to save");
    // item:Observable<ItemId[]>;
    currentPassengerLoggedIn: Passenger = new Passenger(0, "passenger to save");

    
    // passengerToSave: Passenger = new Passenger(null, "passenger to save");
    // passengerID:number;
    // currentPassengerLoggedIn: Passenger = new Passenger(null,"test");
    
    constructor(afs:AngularFirestore,private passengerService:PassengerService, private EventsService:EventsService) {
        this.passenegerCollection = afs.collection<Item>('passengers');
        this.passengers = this.passenegerCollection.snapshotChanges().map(a => {
      return a.map(b => {
        const data = b.payload.doc.data() as Item;
        const id = b.payload.doc.id;
        console.log(data,id);
        return { id,...data};
      })
    }) ;
     }
   

    ngOnInit() {
       // this.passengerService.getPassengers().subscribe(data => this.passengers = data);
     }
      savePassenger(){
      console.log("passengerToSave: "+this.passengerToSave);
      this.passenegerCollection.add({name:this.passengerToSave.name});
    }
    // getPassenger(){
    //   this.passenegerCollection.
    // }
    //  ngOnChanges(changes:SimpleChanges){
    //      console.log(changes.passengers);
    //  }
    //  savePassenger(){
    //     this.passengerService.savePassenger(this.passengerToSave)
    //     .subscribe(data => {
    //         console.log(data);
    //         this.passengerToSave = new Passenger(data.key,data.name);
    //         console.log(this.passengerToSave.name);
    //         this.passengerService.getPassengers().subscribe(data => this.passengers = data);
    //         });
    //  }
    //     getPassenger(){
    //         this.passengerService.getSepcificPassenger(this.passengerID).subscribe( data => this.currentPassengerLoggedIn = data);
    //         console.log("currentPassengerLoggedIn:" + this.currentPassengerLoggedIn);
    //     }
    //     getPassengerEvents(){
    //         this.EventsService.getEventsByPassengerID(this.passengerID).subscribe(data => {console.log(data)});
    //     }t
    
}

