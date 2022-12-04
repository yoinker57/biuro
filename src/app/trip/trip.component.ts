import { Component, OnInit } from '@angular/core';
import { TripsService } from "../services/trips.service";
import { ActivatedRoute } from "@angular/router";
import { Trip } from "../ITrip";
import { first ,Subscription } from "rxjs";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private tripsservice: TripsService)
  { }
    
  private subscription: Subscription | undefined
  trip: Trip | any = null
  id: number = 0

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id']
      this.tripsservice.getTrips().pipe(first()).subscribe((trips: any[]) => {
        let tmp: any
        for (let trip of trips){
            if (trip.id==this.id){
              tmp = trip
              break
            }
        }
        this.trip = ({
          id: tmp.id,
          tittle: tmp.tittle,
          country: tmp.country,
          startdate: tmp.startdate,
          enddate: tmp.enddate,
          price: tmp.price,
          description: tmp.description,
          places: tmp.places,
          cart: tmp.cart,
          ImageLink: tmp.ImageLink,
          rating: tmp.rating,
          nor: tmp.nor,
          rat: tmp.rat} as Trip)
      })
    })
  }
}
