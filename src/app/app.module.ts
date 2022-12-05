import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { environment } from '../environments/environment'; 
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { TripaddComponent } from './tripadd/tripadd.component';
import { LogoComponent } from './logo/logo.component';
import { FiltrComponent } from './filtr/filtr.component';
import { FormsModule } from "@angular/forms";
import { SearchPipe } from './trips/trips.pipe';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from "./app-routing.module";
import { NavikComponent } from './navik/navik.component';
import { TripComponent } from './trip/trip.component';
import { BuytripsComponent } from './buytrips/buytrips.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripaddComponent,
    LogoComponent,
    FiltrComponent,
    SearchPipe,
    CartComponent,
    NavikComponent,
    TripComponent,
    BuytripsComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxSliderModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
