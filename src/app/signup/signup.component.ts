import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private AuthService: AuthService) { }

  public signUpForm = new FormGroup({
    email: new FormControl('',  Validators.required),
    password: new FormControl('',  Validators.required),
  }); 
  
  signup(formData: any){
    this.signUpForm.reset()
    this.AuthService.signUp(formData["email"], formData["password"]);
  }
}
