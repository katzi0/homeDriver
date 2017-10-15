import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from './events.service';
import {
  CalendarEvent,
  CalendarEventAction,
} from 'angular-calendar';

import { AngularFirestore,AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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

/*auto complete*/
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';


/*passengers*/
import { PassengerService } from '../passenger/passenger.service';
import { Passenger } from '../passenger/passenger';

/*drivers*/
import { driverService } from '../driver/driver.service';
import { driver } from '../driver/driver';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
    // moduleId: module.id,
    selector: 'events',
    templateUrl: 'events.component.html',
    providers: [EventsService,PassengerService,driverService]
})

export class EventsComponent implements OnInit {
    //@Input() calendarEvent : CalendarEvent;
    editedCalendarEvent: CalendarEvent = {
      //id:null,
      title: 'New edited event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      passengers:[],
      driver: null,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      isActive:true
  }
/*autocomplete */
protected searchStr: string;
protected searchStrDriver: string;
  protected captain: string;
  protected driver: string;
  protected dataService: CompleterData;
  // protected searchData = [
  //   { color: 'red', value: '#f00' },
  //   { color: 'green', value: '#0f0' },
  //   { color: 'blue', value: '#00f' },
  //   { color: 'cyan', value: '#0ff' },
  //   { color: 'magenta', value: '#f0f' },
  //   { color: 'yellow', value: '#ff0' },
  //   { color: 'black', value: '#000' }
  // ];
  
   protected passengersList = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];
   protected driversList = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];
   private eventsCollection:AngularFirestoreCollection<CalendarEvent>;
   eventsList:Observable<CalendarEvent[]>;
  //  lastEventID:string;

    onEdit: boolean = false;
    events: CalendarEvent[] = [];
    passengers:Passenger[] = [];
    drivers: driver[] = [];
    selectedPassengersMap: {} = {};
    selectedPassengers : Passenger[] = [];
    selectedDriversMap: {} = {};
    selectedDrivers : Passenger[] = [];
    
    // selectedPassengerName : string;

    constructor(private eventsService: EventsService, 
                private PassengerService:PassengerService, 
                private driverService:driverService, 
                private completerService: CompleterService,
                afs:AngularFirestore) {
                this.eventsCollection = afs.collection<CalendarEvent>('calendarEvent');
      // this.dataService = completerService.local(this.searchData, 'color', 'color');
     }

  ngOnInit() {
        // this.eventsService.getEvents().subscribe(data => {console.log(data)});
        
        //  this.PassengerService.getPassengers().subscribe( PassengersData =>{ this.passengers= PassengersData, console.log("passengers:" + this.passengers)
        //  this.passengersList = PassengersData.map(function(passenger){return passenger.name})
        // ,this.initSelectedList(this.passengers),console.log("passenger2s:" + this.passengersList)});
        
        // this.driverService.getdrivers().subscribe( DriversData => { this.drivers = DriversData,
        // this.driversList = DriversData.map(function(driver){return driver.name})
        // ,this.initSelectedList(this.drivers),console.log("drivers:" + this.driversList)});
        //this.eventsList = this.eventsService.getEventsFireBase();
        this.eventsService.getEventsFireBase()
                          .map(events => events
                          .filter(event => event.isActive))
                          .subscribe(data=>{
                            this.events = data,
                            console.log("events:"+this.events)
                           });


     }
  
     addEvent(): void {
    this.events.push({
      id:null,
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: {key: null,
              primary: '#ad2121',
              secondary: '#FAE3E3'},
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      isActive:true
    });

  }
  deleteEvent(calendarEvent:CalendarEvent){
    this.eventsService.deleteEvent(calendarEvent);
  }
  saveEventFireBase(){
    this.eventsCollection.add(this.editedCalendarEvent);
  }
  updateEventFireBase(calendarEvent:CalendarEvent){
    this.eventsService.updateEvent(calendarEvent);
  }
  deActivateEvent(calendarEvent:CalendarEvent){
    this.eventsService.deActivateEvent(calendarEvent);
  }
  saveEvent(): void {
    this.eventsService.saveEvents(this.editedCalendarEvent).subscribe(data => {
      this.events.push(data),console.log(data)
    });
  }
    initSelectedList(list):void {
      for(var i=0; i < list.length; i++){
      //  this.selectedPassengers = ({[this.passengers[i].name] : true}); 
        this.selectedPassengersMap[this.passengers[i].name] = false; 
      }
    }
    updateCheckedOptions(passenger, event) {
      this.selectedPassengersMap[passenger.name] = event.target.checked;
    }
    updateSelectedPassengers(){
      for(var x in this.selectedPassengersMap){
          if(this.selectedPassengersMap[x])
            this.selectedPassengers.push(this.passengers[x]);
      }
    }
    checkForPassengers(){

    }
  
  //autocomplete select event -  passengers
  onSelect(item: CompleterItem){
   if(item) {
    this.editedCalendarEvent.passengers.push(this.passengers.find(x=> x.name == item.title));
    this.selectedPassengers.push(this.passengers.find(x=> x.name == item.title));
    //remove selected passenger from passengers list
    this.passengersList.splice(this.passengersList.indexOf(item.title),1);
    }
  }
  //autocomplete select event -  driver
  onSelectDriver(item: CompleterItem){
   if(item) {
    this.editedCalendarEvent.driver = this.drivers.find(x => x.name == item.title);
      this.selectedDrivers.push(this.drivers.find(x=> x.name == item.title));
    // this.selectedPassengerName = item.title;
    }
  }

  //remove selected passenger from event
  removePassengerFromEvent(passenger){
    this.editedCalendarEvent.passengers.splice(passenger,1);
    this.selectedPassengers.splice(passenger,1);
    this.passengersList.push(passenger);
  }
}