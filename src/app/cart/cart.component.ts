declare const require: any;
import { Component, OnInit} from '@angular/core';
import { Trip } from "../ITrip";
import { Subscription } from 'rxjs';
import { TripsService } from '../services/trips.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  trips: any
  array: Trip[] = []

  constructor(private tripService: TripsService, private authService: AuthService) {  }
  tripssub: Subscription | undefined
  ngOnInit(): void {
    this.trips = this.authService.userCart

    this.tripssub = this.tripService.getTrips().subscribe(change => {
      this.array = []
      for (let trip of change){
        if (this.trips[trip.id] != undefined && this.trips[trip.id] > 0) {
          this.array.push({
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
      }
    })
  }

  buy(trip: any){
    let trip2 = {
      id: trip.id,
      tittle: trip.tittle,
      country: trip.country,
      startdate: trip.startdate,
      enddate: trip.enddate,
      price: trip.price,
      description: trip.description,
      places: trip.places - this.authService.userCart[trip.id],
      cart: trip.cart,
      ImageLink: trip.ImageLink,
      rating: trip.rating,
      nor: trip.nor,
      rat: trip.rat,
    }
    this.authService.userTrips[trip.id] = this.authService.userCart[trip.id]
    this.authService.userCart[trip.id] = 0
    this.tripService.updateUserCart(this.authService.userData.uid, this.authService.userCart)
    this.tripService.updateUserTrips(this.authService.userData.uid, this.authService.userTrips)
    this.tripService.updateTrip(trip2)
  }

  getCartValue(id: number){
    if (this.authService.userCart[id] == undefined) {
      return 0
    }
    return this.authService.userCart[id]
  }



}
