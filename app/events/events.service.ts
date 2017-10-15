import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
//RXJS stuff
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {
    CalendarEvent,
    CalendarEventAction,
} from 'angular-calendar';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
import { driver } from '../driver/driver';
import { Passenger } from '../passenger/passenger';

import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';


@Injectable()
export class EventsService {

    private eventsCollection: AngularFirestoreCollection<CalendarEvent>;
    eventsList: Observable<CalendarEvent[]>;
    itemToRemoveDoc:AngularFirestoreDocument<CalendarEvent>;
    itemToRemove:Observable<CalendarEvent>;
    $itemToDeleteID:string;

    constructor(private http: Http, private afs: AngularFirestore) {
        this.eventsCollection = afs.collection<CalendarEvent>('calendarEvent');
        this.eventsList = this.eventsCollection.snapshotChanges().map(a => {
            return a.map(b => {
                const data = b.payload.doc.data() as CalendarEvent;
                const id = b.payload.doc.id;
                console.log(data, id);
                return { id, ...data };
            })
        })
        this.itemToRemoveDoc = this.afs.doc('calenderEvent/2kDMIYqJNUjzsJRAgHJW');

        //  this.itemToRemove = this.itemToRemoveDoc."calenderEvent/2kDMIYqJNUjzsJRAgHJW"
        
    }
    deleteEvent(calendarEvent:CalendarEvent){
        this.$itemToDeleteID = calendarEvent.id;
        // this.itemToRemoveDoc = this.afs.doc<CalendarEvent>('calenderEvent/' + this.$itemToDeleteID);
        // this.itemToRemove = this.itemToRemoveDoc.valueChanges();
        console.log("itemToRemove:"+this.itemToRemove);
        this.itemToRemoveDoc.delete();
    }
    deActivateEvent(calendarEvent:CalendarEvent){
        calendarEvent.isActive = false;
         this.eventsCollection.doc(calendarEvent.id).update(calendarEvent);
    }
    getEvents() {
        return this.http.get('http://localhost:50751/api/CalendarEvent/')
            .map((res: Response) => res.json());
    }
    getEventsFireBase(){
        return this.eventsList;
    }
    updateEvent(calendarEvent:CalendarEvent){
        console.log("updated eventid:"+calendarEvent.id);
        this.eventsCollection.doc(calendarEvent.id).update(calendarEvent);
    }

    saveEvent() {
        var passenger1: Passenger = new Passenger(1, "test");
        var arr: Array<Passenger> = [passenger1, passenger1];

        // var arr: Array<{id: number, name: string}> = [{id:null,name:"passenger1"},{id:null,name:"passenger1"}];
        var tripToSave: CalendarEvent =
            {
                 id: null,
                // tripDriver: new driver(null,"testdriver"),
                // passsengers: arr,
                start: addHours(startOfDay(new Date()), 2),
                end: new Date(),
                title: 'A draggable and resizable event',
                color: {
                    primary: '#ad2121',
                    secondary: '#FAE3E3'
                },
                isActive:true
            }

        var driver: driver = {
            id: null,
            name: "driverTest"
        }



        var demoEvent: any = {
            // key: null,
            start: addHours(startOfDay(new Date()), 2),
            end: new Date(),
            title: "test",//"test event",
            numOfSeats: 3,
            driver: driver,
            passengers: arr
        }



        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:50751/api/CalendarEvent/', demoEvent, headers)
            .map((res: Response) => res.json());
    }

    saveEvents(event: CalendarEvent) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:50751/api/CalendarEvent/', event, headers)
            .map((res: Response) => res.json());
    }

    getEventsByPassengerID(passengerID: number) {
        const url = `$http://localhost:50751/api/CalendarEvent/$2`;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:50751/api/CalendarEvent/' + passengerID).map((res: Response) => res.json());//${this.heroesUrl}/${id}`;
        //return this.http.get(url).map((res:Response) => res.json());//${this.heroesUrl}/${id}`;

    }

}