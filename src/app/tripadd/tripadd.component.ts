import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Trip } from '../ITrip';
import { TripsService } from "../services/trips.service";

@Component({
  selector: 'app-tripadd',
  templateUrl: './tripadd.component.html',
  styleUrls: ['./tripadd.component.css']
})
export class TripaddComponent {
  constructor(private tripService: TripsService){ }


  tripadd = new FormGroup({
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

  dateToString(data: any){
    const month = data.getMonth() + 1
    return data.getFullYear() + '-' + month + '-' + data.getDate()
  }
  compareDate(data: any, data1: any){ 
    data = this.dateToString(data)
    if (data1 < data) {
      return true
    }
    return false
  }

  error = false
  ok = false
  

  addTrip(){
    this.error = false;
    this.ok = false;  
    if (!this.tripadd.valid) {
      this.error = true
      return
    }
    let trip = {
      id: this.tripService.getNextID(),
      tittle: this.tripadd.get('title')!.value,
      country: this.tripadd.get('country')!.value,
      startdate: this.tripadd.get('date1')!.value,
      enddate: this.tripadd.get('date2')!.value,
      price: this.tripadd.get('price')!.value,
      places: this.tripadd.get('places')!.value,
      description: this.tripadd.get('desc')!.value,
      ImageLink: this.tripadd.get('link')!.value,
      cart: 0,
      "rating": 0,
      "nor": 0,
      "rat": 1,
    } as unknown as Trip;
    console.log(trip)
    const data = new Date()
    this.compareDate(data, trip.startdate)

    if (trip.startdate != null && trip.enddate != null) {
      if (trip.startdate > trip.enddate || this.compareDate(data, trip.startdate) || this.compareDate(data, trip.enddate)) {
        this.error = true
        return
      }
    }
    console.log(trip)
    this.tripService.addTrip(trip)
    this.error = false
    this.ok = true
    this.tripadd.reset()
  }
}

