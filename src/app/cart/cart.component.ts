declare const require: any;
import { Component, OnInit} from '@angular/core';
import { CartService } from "../services/cart.service";
import { Trip } from "../ITrip";
import { Subscription } from 'rxjs';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  trips: Trip[] = []

  constructor(private tripService: TripsService) {  }
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

  buy(trip: any){
    let trip2 = {
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
    }
    this.tripService.add2buy(trip2)
    trip.places -= trip.cart
    trip.cart = 0
    this.tripService.updateTrip(trip)
  }


}
