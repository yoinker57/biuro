import { Component, OnInit, Pipe, PipeTransform, ViewChildren } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { Subscription } from 'rxjs';
import { Trip } from "../ITrip";
import { AuthService } from '../services/auth.service';

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

  constructor(
      private authService: AuthService,
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
      this.getNum()
    })

  }
  
  getNum(){
    let tmp = 0
    this.trips.forEach(trip => {
      tmp += trip.cart
    });
    this.num = tmp
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

  tripadder(trip: any){
    this.trips.push(trip)
    this.trips = [...this.trips]
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
  canBuy(){
    return this.authService.userData!=null
  }

  add2Cart(id: number){
    if (this.authService.userCart[id] == undefined) {
      this.authService.userCart[id] = 1;
    }
    else{
      let tmp = this.authService.userCart[id];
      this.authService.userCart[id] = tmp + 1;
    }
    this.tripService.updateUserCart(this.authService.userData.uid, this.authService.userCart)
  }

  delFromCart(id: number){
    this.authService.userCart[id] -= 1
    this.tripService.updateUserCart(this.authService.userData.uid, this.authService.userCart)
  }

  getTripPlaces(trip: Trip){
    if (this.authService.userCart[trip.id] == undefined) {
      return trip.places
    }
    return trip.places - this.authService.userCart[trip.id]
  }

  getCartValue(id: number){
    if (this.authService.userCart[id] == undefined) {
      return 0
    }
    return this.authService.userCart[id]
  }

  numberOfTrips(){
    // console.log(this.authService.userCart.value())
    let sum = 0;
    for (const key in this.authService.userCart) {
      sum += this.authService.userCart[key];
    }
    return sum
  }

  numberofTrip(tripid: any){
    return this.authService.userCart[tripid]
  }

}

