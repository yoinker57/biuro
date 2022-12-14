import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError, first } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders} from '@angular/common/http';
import { Trip } from "../ITrip";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class TripsService {
  trips: Observable<any[]>
  private nextId: number = 0
  opinions: any = []
  buyTrips: Trip[] = []

  constructor(private db: AngularFireDatabase){ 
    this.trips = this.db.list('Trips').valueChanges();
    this.db.list('Trips', ref=> ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextId = res[0]?.id+1})
  }

  getTrips(): Observable<any[]>{
    return this.trips
  }
  removeTrip(id: String){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==id)
        {
          console.log(i.payload.key)
          this.db.list('Trips').remove(i.payload.key)
        }
      }
    } )
  }
  addTrip(trip: Trip){
    this.db.list('Trips').push({
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
    })
  }
  updateTrip(trip:Trip){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==trip.id)
        {
          console.log(i.payload.key)
          this.db.list('Trips').update(i.payload.key, {
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
            rat: trip.rat
          })
        }
      }
    } )
  }

  addOpinion(opion: any){
    this.opinions.push(opion)
  }
  getOpinions(){
    return this.opinions
  }

  add2buy(trip: any){
    this.buyTrips.push(trip)
    console.log(this.buyTrips);
  }
  get2buy(){
    return this.buyTrips
  }

  getNextID(){
    return this.nextId
  }



  // dla każdego użytkownika po zalogowaniu bierzemy jego wycieczki i zapisujemy do tablicy
  // dodatkowo mamy w trips usera którego dane zmianiają się w zależności zalogowanie/wylogowanie braz zalogowania
  // 

}