import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchPipe' })
export class SearchPipe implements PipeTransform {
    transform(trips: any, data: any): any {
            if (data.countries == undefined) {
                return trips
            }
            return trips.filter((trip:any) => {
                let flag = true
                if (!data.countries.includes(trip.country) && data.countries.length != 0) {
                  flag = false
                }
                if(trip.price < data.minprice || trip.price > data.maxprice){
                  flag = false
                }
                if(trip.rating < data.minrating || trip.rating > data.maxrating){
                  flag = false
                }
                if ((trip.startdate < data.startdate || trip.startdate > data.enddate) && data.startdate != "" ) {
                  flag = false
                }
                if ((trip.enddate < data.startdate || trip.enddate > data.enddate) && data.enddate != "" ) {
                  flag = false
                }
                return flag
            }) 

    }
}

