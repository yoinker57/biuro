import { Component, OnInit, Pipe, PipeTransform, ViewChildren } from '@angular/core';
import { CartService } from "../cart.service";
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  trips: any
  display = "none"
  source = ""
  data = []
  cart: number = 0
  data2: any[] = []
  constructor(private dataService: CartService, private tripService: TripsService) { }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe(res => this.trips=res)
  }
  showphoto(x: any){
    this.display = "block"
    this.source = x.ImageLink
    console.log(this.data2);
  }
  unshow(){
    this.display = "none"
    this.source = ""
  }
  
  maxPrice(){
    let max = 0;
    let maxtrip: any;
    this.trips.forEach((trip: any) => {
      if (trip.price > max && trip.places - trip.cart != 0) {
        max = trip.price
        maxtrip = trip
      }
    });
    return maxtrip;
  }
  minPrice(){
    let min = Math.pow(10, 1000);
    let mintrip: any;
    this.trips.forEach((trip: any) => {
      if (trip.price < min && trip.places - trip.cart != 0) {
        min = trip.price
        mintrip = trip
      }
    });
    return mintrip;
  }

  addToCart(trip: any){
    trip.cart++;
    this.cart++;
    this.dataService.setTrips(this.trips); 
  }

  removeFromCart(trip: any){
    trip.cart--;
    this.cart--;
    this.dataService.setTrips(this.trips);
  }

  delTrip(trip: any){
    this.cart -= trip.cart
    for (var _i = 0; _i < this.trips.length; _i++) {
      if (this.trips[_i] == trip) {
        this.trips.splice(_i, 1)
      }
    }
    this.trips = [...this.trips]
    this.dataService.setTrips(this.trips);
  }

  tripadder(trip: any){
    this.trips.push(trip)
    this.trips = [...this.trips]
  }
  
  getSliderValue(event: any, trip: any) {
    trip.rat = Number(event.target.value)
  }
  
  addrate(trip: any){
    trip.rating = (trip.nor * trip.rating + trip.rat)/(trip.nor + 1)
    trip.nor++
  }

  getCountry(trips: any){
    let countries: any = []
    trips.forEach((trip: any) => {
      if (!countries.includes(trip.country)) {
        countries.push(trip.country)
      }
    });
    return countries
  }
  
  filtrUpdate(data: any){
    this.data = data
    console.log(data)
  }
}

