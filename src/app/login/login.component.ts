import { Component } from '@angular/core';

import {FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private AuthService: AuthService){}

  public loginForm = new FormGroup({
    email: new FormControl('',  Validators.required),
    password: new FormControl('',  Validators.required),
  }); 

  login(formData: any){
    this.loginForm.reset();
    this.AuthService.logIn(formData["email"], formData["password"]);
  }
}
