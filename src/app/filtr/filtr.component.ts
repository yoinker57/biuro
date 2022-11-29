import { Component, EventEmitter, Input, Output, Type} from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";
import { FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-filtr',
  templateUrl: './filtr.component.html',
  styleUrls: ['./filtr.component.css']
})
export class FiltrComponent{
  @Input() trips = []
  @Input() countries = ['a']
  @Output() filtered = new EventEmitter();
  @Output() reset = new EventEmitter();
  show ='none'
  nshow = 'block'
  today = this.dateToString(new Date())
  highValue = this.maxPrice(this.trips)
  value = this.minPrice(this.trips)
  highRating = 5
  lowRating = 1
  form!: FormGroup;

  showing(){
    this.highValue = this.maxPrice(this.trips)
    this.value = this.minPrice(this.trips)
    this.show = 'block'
    this.nshow = 'none'
  }

  dateToString(data: any){
    const month = data.getMonth() + 1
    return data.getFullYear() + '-' + month + '-' + data.getDate()
  }

  options2: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 1, legend: "😞" },
      { value: 2 },
      { value: 3, legend: "😐"},
      { value: 4 },
      { value: 5, legend: "😊" },
    ]
  };

  sliderOptions(): Options {
      return {
        floor:this.minPrice(this.trips),
        ceil: this.maxPrice(this.trips)
      };
  }

  maxPrice(trips:any){
    let max: number = 0;
    trips.forEach((trip: any) => {
      if (trip.price > max) {max = trip.price}
    });
    if (max == 0) {
      return 10000
    }
    return max
  }

  minPrice(trips: any){
    let min = Math.pow(10, 1000);
    trips.forEach((trip: any) => {
      if (trip.price < min ){ min = trip.price}
    });
    if (min == Math.pow(10, 1000)) {
      return 0
    }
    return min;
  }
  
  countries2: any = []
  
  Change(country: any){
    if (!this.countries2.includes(country)) {
      this.countries2.push(country)
    }
    else{
      this.countries2 = this.countries2.filter((id: any) => id != country)
    }
  }

  tripfiltr = new FormGroup({
    startdate: new FormControl(""),
    enddate: new FormControl("")
  })

  filtr(){
    let data = {
      "countries": this.countries2,
      "minprice": this.value,
      "maxprice": this.highValue,
      "minrating": this.lowRating,
      "maxrating": this.highRating,
      "count": [],
      "startdate": this.tripfiltr.get('startdate')!.value,
      "enddate": this.tripfiltr.get('enddate')!.value,
    }
    data.countries = data.countries.filter((country: any) => {
      return this.countries.includes(country)
    })
    this.filtered.emit(data)
  }



}

