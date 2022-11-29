
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private trips: any
  private price: number = 0
  setTrips(trips: any){
    this.trips = trips
  }
  getTrips(){
    return this.trips
  }
}
