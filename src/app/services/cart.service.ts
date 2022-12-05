
import { Injectable } from '@angular/core';
import { Trip } from "../ITrip";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private trips: Trip[] = []
  private price: number = 0
  
  addTrip(trip: Trip){
    let flag = false
    this.trips.forEach(el => {
      if (el.id == trip.id) {
        el = trip
        flag = true
        return
      }
    });
    if (!flag) {
      this.trips.push(trip)
    }
  }

  removeTrip(trip: Trip){
    console.log(trip)
  }

  getTrips(){
    return this.trips
  }
}
