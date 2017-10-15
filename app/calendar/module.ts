import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../demo-utils/module';
import { CalendarDayViewComponent } from './all-day.component';
import { AddEventComponent } from './add-event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    DemoUtilsModule
  ],
  declarations: [
    CalendarDayViewComponent, AddEventComponent
  ],
  exports: [
    CalendarDayViewComponent, AddEventComponent
  ],
  bootstrap: [CalendarDayViewComponent]
})
export class DayViewModule {}