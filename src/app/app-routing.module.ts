import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { TripsComponent } from "./trips/trips.component";
import { TripaddComponent } from "./tripadd/tripadd.component";
import { TripComponent } from "./trip/trip.component";
import { CartComponent } from './cart/cart.component';
import { BuytripsComponent } from './buytrips/buytrips.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';
import { MenpanelComponent } from './menpanel/menpanel.component';
import { AdmpanelComponent } from './admpanel/admpanel.component';
import { ModerGuard } from './guard/moder.guard';
import { AdminGuard } from './guard/admin.guard';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { TripmodComponent } from './tripmod/tripmod.component';


const routes: Routes = [
  {path: 'trips', component: TripsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'trip/:id', component: TripComponent, canActivate: [AuthGuard]},
  {path: 'addtrip', component: TripaddComponent},
  {path: 'yourtrips', component: BuytripsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signout', component: SignoutComponent},
  {path: 'moder', component: MenpanelComponent, canActivate: [ModerGuard]},
  {path: 'tripmod/:id', component: TripmodComponent, canActivate: [ModerGuard]},
  {path: 'admin', component: AdmpanelComponent, canActivate: [AdminGuard]},
  {path: 'passwordreset', component: ResetpasswordComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }