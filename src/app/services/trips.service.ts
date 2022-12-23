import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, firstValueFrom, first } from 'rxjs';
import { Trip } from "../ITrip";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { User } from '../User';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TripsService {
  trips: Observable<any[]>
  alltrips: Observable<any[]>
  private nextId: number = 0
  opinions: any = []

  constructor(private db: AngularFireDatabase){ 
    this.trips = this.db.list('Trips').valueChanges();
    this.alltrips = this.db.list('allTrips').valueChanges();
    this.db.list('allTrips', ref=> ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextId = res[0]?.id+1})
  }

  getTrips(): Observable<any[]>{
    return this.trips
  }
  getTrips2(): Observable<any[]>{
    return this.alltrips
  }
  removeTrip(id: String){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==id)
        {
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
    this.db.list('allTrips').push({
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
    this.db.list('allTrips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==trip.id)
        {
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

  add2cart(trip: Trip, uid: String, n: number){
  }

  updateUserCart(uid: String, userCart: any){
    this.db.object('/users/' + uid + '/cart').set(userCart)
  }

  updateUserTrips(uid: String, userTrips: any){
    this.db.object('/users/' + uid + '/trips').set(userTrips)
  }

  updateUserRating(uid: String, userRating: any){
    this.db.object('/users/' + uid + '/ratedTrips').set(userRating)
  }


  getNextID(){
    return this.nextId
  }

  addNewUser(user: User){
    this.db.object('/users/' + user.uid).set({
      email: user.email,
      roles: user.roles,
      cart: {0:0},
      trips: {0:0},
      ratedTrips: {0: false}
    })
  }
  getUserRoles(uid: String){
    return firstValueFrom(
      this.db.object('/users/' + uid + '/roles').valueChanges()
    );
  }

  getUserCard(uid: String){
    return firstValueFrom(
      this.db.object('/users/' + uid + '/cart').valueChanges()
    );
  }

  getUserTrips(uid: String){
    return firstValueFrom(
      this.db.object('/users/' + uid + '/trips').valueChanges()
    );
  }

  getUserRating(uid: String){
    return firstValueFrom(
      this.db.object('/users/' + uid + '/ratedTrips').valueChanges()
    );
  }

  getUsers() {
    return this.db.list('users').snapshotChanges();
  }

  setRole(uid: String, role: string, flag: boolean){
    let newrole = '{"' + role + '"' + ':' + flag + '}';
    this.db.object('/users/' + uid + '/roles').update(JSON.parse(newrole));
  }



// w trips zapisujemy tylko ID wycieczki


}

