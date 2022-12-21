import { Component, OnInit } from '@angular/core';
import { TripsService } from "../services/trips.service";
import { Trip } from "../ITrip";
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-buytrips',
  templateUrl: './buytrips.component.html',
  styleUrls: ['./buytrips.component.css']
})
export class BuytripsComponent implements OnInit {
  trips: any
  array: Trip[] = []

  constructor(private tripService: TripsService, private authService: AuthService) {  }
  tripssub: Subscription | undefined
  ngOnInit(): void {
    this.trips = this.authService.userTrips

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

  getPlaces(id: number){
    return this.authService.userTrips[id]
  }




  dateToString(data: any){
    const month = data.getMonth() + 1
    if (data.getDate() < 10) {
      return data.getFullYear() + '-' + month + '-0' + data.getDate()
    }
    return data.getFullYear() + '-' + month + '-' + data.getDate()
  }

  data = new Date()

  status(trip: Trip){
    let data1 = this.dateToString(this.data)
    if (data1 < trip.enddate && data1 > trip.startdate) {
      return 0
    }
    if (data1 < trip.startdate) {
      return 2
    }
    if (trip.enddate < data1) {
      return 1
    }
    return 3
  }

  filtry: Number[] = []
  filtr(n: number){
    if (!this.filtry.includes(n)) {
      this.filtry.push(n)
    }
    else{
      this.filtry = this.filtry.filter((id: any) => id != n)
    }
  }


  


}
