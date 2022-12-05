import { Component, OnInit, Pipe, PipeTransform, ViewChildren } from '@angular/core';
import { CartService } from "../services/cart.service";
import { TripsService } from '../services/trips.service';
import { Subscription } from 'rxjs';
import { Trip } from "../ITrip";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  trips: any[] = []
  cart: Trip[] = []
  data = []
  num: number = 0

  constructor(private cartService: CartService,
     private tripService: TripsService) { }

  tripssub: Subscription | undefined
  ngOnInit(): void {
    this.tripssub = this.tripService.getTrips().subscribe(change => {
      this.trips = []
      for (let trip of change){
        this.trips.push({
          id: trip.id,
          tittle: trip.tittle,
          country: trip.country,
          startdate: trip.startdate,
          enddate: trip.enddate,
          price: trip.price,
          description: trip.description,
          places: trip.places,
          cart: trip.cart,
          ImageLink: trip.ImageLink,
          rating: trip.rating,
          nor: trip.nor,
          rat: trip.rat,
        } as Trip)
      }
    })

  }
  
  maxPrice(){
    let max = 0;
    this.trips.forEach((trip: Trip) => {
      max = Math.max(max, trip.price)
    });
    return max;
  }
  minPrice(){
    let min = Math.pow(10, 1000);
    this.trips.forEach((trip: Trip) => {
      min = Math.min(min, trip.price)
    });
    return min;
  }

  addToCart(trip: any){
    trip.cart++;
    this.num++
    this.tripService.updateTrip(trip)
  }

  removeFromCart(trip: any){
    trip.cart--;
    this.num--
    this.tripService.updateTrip(trip)
  }

  delTrip(trip: Trip){
    this.num -= trip.cart
    let index = this.cart.indexOf(this.trips[trip.id])
    while (index >= 0){
      this.cart.splice(index, 1);
      index = this.cart.indexOf(this.trips[trip.id])
    }
    this.tripService.removeTrip(String(trip.id))
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
  }
}

