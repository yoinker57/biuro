import { Component, OnInit } from '@angular/core';
import { TripsService } from "../services/trips.service";
import { Trip } from "../ITrip";

@Component({
  selector: 'app-buytrips',
  templateUrl: './buytrips.component.html',
  styleUrls: ['./buytrips.component.css']
})
export class BuytripsComponent implements OnInit {
  buyTrips: Trip[] = []
  constructor(private tripsService: TripsService){ }


  ngOnInit(): void {
      this.buyTrips = this.tripsService.get2buy()
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
