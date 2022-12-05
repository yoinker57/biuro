import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TripsComponent } from "./trips/trips.component";
import { TripaddComponent } from "./tripadd/tripadd.component";
import { TripComponent } from "./trip/trip.component";
import { CartComponent } from './cart/cart.component';
import { BuytripsComponent } from './buytrips/buytrips.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {path: 'trips', component: TripsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'trip/:id', component: TripComponent},
  {path: 'addtrip', component: TripaddComponent},
  {path: 'yourtrips', component: BuytripsComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }