import { Component, OnInit } from '@angular/core';
import { TripsService } from "../services/trips.service";
import { CartService } from "../services/cart.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Trip } from "../ITrip";
import { first ,Subscription } from "rxjs";

@Component({
  selector: 'app-tripmod',
  templateUrl: './tripmod.component.html',
  styleUrls: ['./tripmod.component.css']
})
export class TripmodComponent implements OnInit{
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
              this.modification.controls['title'].setValue(tmp.tittle)
              this.modification.controls['country'].setValue(tmp.country)
              this.modification.controls['date1'].setValue(tmp.startdate)
              this.modification.controls['date2'].setValue(tmp.enddate)
              this.modification.controls['price'].setValue(tmp.price)
              this.modification.controls['places'].setValue(tmp.places)
              this.modification.controls['desc'].setValue(tmp.description)
              this.modification.controls['link'].setValue(tmp.ImageLink)
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
  modification = new FormGroup({
    title: new FormControl("", [
      Validators.required,
    ]),
    country: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    date1: new FormControl("", [
      Validators.required,
    ]),
    date2: new FormControl("", [
      Validators.required,
    ]),
    price: new FormControl("", [
      Validators.required,
      Validators.min(0)
    ]),
    places: new FormControl("", [
      Validators.required,
      Validators.min(1)
    ]),
    desc: new FormControl("", [
      Validators.required,
    ]),
    link: new FormControl("", [
      Validators.required,
    ]),
  })

  error = false
  ok = false
  update(){
    this.error = false;
    this.ok = false;  
    if (!this.modification.valid) {
      this.error = true
      return
    }
    let trip = {
      id: this.trip.id,
      tittle: this.modification.get('title')!.value,
      country: this.modification.get('country')!.value,
      startdate: this.modification.get('date1')!.value,
      enddate: this.modification.get('date2')!.value,
      price: this.modification.get('price')!.value,
      places: this.modification.get('places')!.value,
      description: this.modification.get('desc')!.value,
      ImageLink: this.modification.get('link')!.value,
      cart: 0,
      "rating": this.trip.rating,
      "nor": this.trip.nor,
      "rat": this.trip.rat,
    } as unknown as Trip;
    
    if (trip.startdate != null && trip.enddate != null) {
      if (trip.startdate > trip.enddate) {
        this.error = true
        return
      }
    }
    console.log('accept');
    this.tripsservice.updateTrip(trip)
    this.error = false
    this.ok = true
    this.modification.reset()
  }

}
