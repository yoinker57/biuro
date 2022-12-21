import { Component } from '@angular/core';

import {FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  constructor(private AuthService: AuthService){}

  public resetForm = new FormGroup({
    email: new FormControl('',  Validators.required),
  }); 

  reset(formData: any){
    this.resetForm.reset();
    this.AuthService.resetPassword(formData["email"]);
  }
}
