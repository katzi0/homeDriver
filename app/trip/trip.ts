import { Passenger } from "../passenger/passenger";
import { driver } from "../driver/driver";

export class trip {
     constructor(
    public id: string,
    public tripDriver: driver,
    public passsengers: Passenger[],
    //public Passsengers: string,
    public startTime: Date,
    public endTime: Date,
    public tripDestination:string,
    public numOfSeats: number
    ){}
}