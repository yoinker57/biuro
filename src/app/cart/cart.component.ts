declare const require: any;
import { Component} from '@angular/core';
import { CartService } from "../cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  trips: any
  price = 0
  constructor(private dataService: CartService) {  }
  ngAfterViewInit() {
    this.trips = this.dataService.getTrips();
  }
  priceUpdate(){
    let price = 0
    this.trips.forEach((trip:any) => {
      price += trip.price*trip.cart
    });
    this.price = price
  }

}
