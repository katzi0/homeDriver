import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
/*bootstrap*/
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

/*autocomplete */
import { Ng2CompleterModule } from "ng2-completer";

import { AppComponent } from './app.component';
import { PassengerComponent } from './passenger/passenger.component';
import { DriverComponent } from './driver/driver.component';
import { TripComponent } from './trip/trip.component';
import { TripFormComponent } from './trip/trip-form.component';

/* calendar*/ 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

// import { DayViewModule } from './calendar/module';
import { CalendarDayViewComponent } from './calendar/all-day.component'
import { AddEventComponent } from './calendar/add-event.component'

import { DemoUtilsModule } from './demo-utils/module';
// import { DemoModule } from './calendar/module';

import { EventsComponent } from './events/events.component';

//AngularFireModule
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';


/* calendar*/
const appRoutes: Routes = [
  { path:'passengers', component: PassengerComponent },
  { path:'drivers', component: DriverComponent },
  { path: 'add-event' , component: AddEventComponent },
  { path: 'calendar' , component: CalendarDayViewComponent },
  { path: 'events', component: EventsComponent },
  { path: 'trips', component: TripComponent },

]

@NgModule({
  declarations: [
    AppComponent, PassengerComponent, DriverComponent, TripComponent, TripFormComponent,CalendarDayViewComponent, AddEventComponent,EventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule, // angular 4.0+ only
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    // NgbModule,
    NgbModalModule,
    DemoUtilsModule,
    Ng2CompleterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
    // , DemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
