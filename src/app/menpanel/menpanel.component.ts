import { Component, OnInit } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { Subscription } from 'rxjs';
import { Trip } from "../ITrip";

@Component({
  selector: 'app-menpanel',
  templateUrl: './menpanel.component.html',
  styleUrls: ['./menpanel.component.css']
})
export class MenpanelComponent implements OnInit {
  trips: any[] = []
  cart: Trip[] = []
  data = []
  num: number = 0

  constructor(private tripService: TripsService) { }

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

  delTrip(trip: Trip){
    this.num -= trip.cart
    let index = this.cart.indexOf(this.trips[trip.id])
    while (index >= 0){
      this.cart.splice(index, 1);
      index = this.cart.indexOf(this.trips[trip.id])
    }
    this.tripService.removeTrip(String(trip.id))
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
