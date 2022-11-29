import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';


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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxSliderModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
