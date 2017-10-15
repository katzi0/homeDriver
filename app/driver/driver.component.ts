import { Component, OnInit, OnChanges } from '@angular/core';// SimpleChanges, Input
import { driver } from './driver';
import { driverService } from './driver.service';

@Component({
  //  moduleId: module.id,
    selector: 'driver-component',
    templateUrl: 'driver.component.html',
    providers: [driverService]
})

export class DriverComponent implements OnInit { //,OnChanges
    drivers:driver[];
    driverToSave: driver = new driver(null, "driver to save");
    constructor(private driverService:driverService) { }
   

    ngOnInit() {
        this.driverService.getdrivers().subscribe(data => this.drivers = data);
     }
    //  ngOnChanges(changes:SimpleChanges){
    //      console.log(changes.passengers);
    //  }
     saveDriver(){
        this.driverService.saveDriver(this.driverToSave)
        .subscribe(data => {
            console.log(data);
            this.driverToSave = new driver(data.key,data.name);
            console.log(this.driverToSave.name);
            this.driverService.getdrivers().subscribe(data => this.drivers = data);
            });
     }
}

