import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders} from '@angular/common/http';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-type': 'application/json; charset=UTF-8'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  trips: any

  constructor(private http: HttpClient) {
    this.trips = this.http.get<JSON[]>("https://jsonblob.com/api/jsonBlob/1047241636232577024")
    console.log(this.trips)
  }

  getTrips(): Observable<JSON[]>{
    return this.trips
  }


}