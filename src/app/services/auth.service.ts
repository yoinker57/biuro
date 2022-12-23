import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, throwError, first } from 'rxjs';
import { Router } from "@angular/router";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { User, Roles } from "../User";
import { TripsService } from "./trips.service";
import { async } from '@firebase/util';
import { Trip, CartTrip } from '../ITrip';



@Injectable({
  providedIn: 'root'
})
export class AuthService{
  userData: any = null;
  userRoles: any =
  {
    admin: false,
    menager: false,
    client: false,
    banned: false,
  };
  userCart: any[] = [];
  userTrips: any[] = [];
  userRating: any[] = []
  persistance: string = 'local';

  constructor(private fireAuth: AngularFireAuth, private tripsService: TripsService, private router: Router) {
    fireAuth.authState.subscribe(async (user: any) => {
      if (user) {
        this.userData = user;
        let roles = await this.tripsService.getUserRoles(user.uid);
        let cart = await this.tripsService.getUserCard(user.uid)
        let trips = await this.tripsService.getUserTrips(user.uid)
        let rating = await this.tripsService.getUserRating(user.uid)
        this.userRoles = roles as Roles;
        this.userCart = cart as any;
        this.userTrips = trips as any;
        this.userRating = rating as any;
      } else {
        this.userData = null;
        this.userCart = [];
        this.userTrips = [];
        this.userRoles = {
          admin: false,
          menager: false,
          client: false,
          banned: false,
        };
      }
    });
   }

  signUp(email: string, password: string) {
    return this.
      fireAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        let userData = new User(res.user);
        this.tripsService.addNewUser(userData);
        this.router.navigate(['']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }
  logIn(email: string, password: string){
    return this.fireAuth.setPersistence(this.persistance).then((_) => {
      return this.fireAuth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          this.router.navigate(['']);
        })
        .catch((err) => {
          window.alert(err.message);
        });
    });
  }

  signOut() {
    return this.fireAuth.signOut().then((ev) => {
      this.router.navigate(['']);
    });
  }

  resetPassword(email: string){
    this.fireAuth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['']);
      }
    )
  }

  isLoggedIn(){
    return this.userData != null
  }

  getAuthenticated(): Observable<any> {
    return this.fireAuth.authState;
  }

  changePersistence(persistence: string){
    this.fireAuth.setPersistence(persistence)
  }

  getRole(){
    return this.userRoles
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.fireAuth.onAuthStateChanged((user) => {
        resolve(user);
      }, reject);
    });
  }


}
