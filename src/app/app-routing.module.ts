import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TripsComponent } from "./trips/trips.component";
import { TripaddComponent } from "./tripadd/tripadd.component";
import { LogoComponent } from "./logo/logo.component";
// import { TripsComponent } from "./trips/trips.component";


const routes: Routes = [
  {path: 'trips', component: TripsComponent},
  // {path: 'trip/:id', component: SingledishComponent},
  {path: 'addtrip', component: TripaddComponent},
//   {path: 'cart', component: CartComponent},
//   {path: '', component: HomeComponent},
//   {path: '**', component: PagenotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }