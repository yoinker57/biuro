import { Component, OnInit } from '@angular/core';
import { TripsService } from "../services/trips.service";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Trip } from "../ITrip";
import { first ,Subscription } from "rxjs";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private tripsservice: TripsService)
  { }
    
  private subscription: Subscription | undefined
  trip: Trip | any = null
  id: number = 0
  opinions = this.tripsservice.getOpinions()
  errorsMessages: String[] = [
    'Wprowadź nick',
    'Wprowadź nazwę wycieczki',
    'Opinia powinna mieć od 50 do 500 znaków',
  ]
  errors: String[] = []

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

  getSliderValue(event: any, trip: any) {
    trip.rat = Number(event.target.value)
  }

  addrate(trip: any){
    trip.rating = (trip.nor * trip.rating + trip.rat)/(trip.nor + 1)
    trip.nor++
    this.authService.userRating[trip.id] = true;
    this.tripsservice.updateUserRating(this.authService.userData.uid, this.authService.userRating)
    this.tripsservice.updateTrip(trip)
  }

  opinionadd = new FormGroup({
    Nick: new FormControl("", [
      Validators.required,
    ]),
    Name: new FormControl("", [
      Validators.required,
    ]),
    opinion: new FormControl("", [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(500),
    ]),
    date: new FormControl(""),
  })

  addOpinion(){
    this.errors = []
    if (!this.opinionadd.get('Nick')!.valid && !this.errors.includes(this.errorsMessages[0])) {
      this.errors.push(this.errorsMessages[0])
    }
    if (!this.opinionadd.get('Name')!.valid && !this.errors.includes(this.errorsMessages[1])) {
      this.errors.push(this.errorsMessages[1])
    }
    if (!this.opinionadd.get('opinion')!.valid && !this.errors.includes(this.errorsMessages[2])) {
      this.errors.push(this.errorsMessages[2])
    }
    if (!this.opinionadd.valid) {
      return
    }
    this.errors = []
    let opinion = {
      Nick: this.opinionadd.get('Nick')!.value,
      Name: this.opinionadd.get('Name')!.value,
      opinion: this.opinionadd.get('opinion')!.value,
      date: this.opinionadd.get('date')!.value,
    }
    this.tripsservice.addOpinion(opinion)
    this.opinionadd.reset()
  }

  add2Cart(id: number){
    if (this.authService.userCart[id] == undefined) {
      this.authService.userCart[id] = 1;
    }
    else{
      let tmp = this.authService.userCart[id];
      this.authService.userCart[id] = tmp + 1;
    }
    this.tripsservice.updateUserCart(this.authService.userData.uid, this.authService.userCart)
  }

  delFromCart(id: number){
    this.authService.userCart[id] -= 1
    this.tripsservice.updateUserCart(this.authService.userData.uid, this.authService.userCart)
  }

  getTripPlaces(id: number){
    if (this.authService.userCart[id] == undefined) {
      return this.trip.places
    }
    return this.trip.places - this.authService.userCart[id]
  }

  getCartValue(id: number){
    if (this.authService.userCart[id] == undefined) {
      return 0
    }
    return this.authService.userCart[id]
  }

  banned(){
    return this.authService.userRoles.banned
  }

  inTripHistory(id: number){
    if (this.authService.userTrips[id] != undefined && this.authService.userTrips[id] != 0) {
      return true
    }
    return false
  }

  isRated(id: number){
    if (this.authService.userRating[id] != undefined && this.authService.userRating[id] != false) {
      return true
    }
    return false
  }




  

}


