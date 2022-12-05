import { Component, OnInit } from '@angular/core';
import { TripsService } from "../services/trips.service";
import { CartService } from "../services/cart.service";
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
    private cartService: CartService,
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

  add2Cart(trip: Trip){
    this.tripsservice.updateTrip(trip)
    this.trip.cart++
  }
  delFromCart(trip: Trip){
    this.trip.cart--
    this.tripsservice.updateTrip(trip)
  }


  

}


// zrobić w jsonie następną tabelke zakupione wycieczki
// następnie jak damy w koszyku zakup to aktualizujemy
// Trips w firebasie i zakupione wycieczki
// 
