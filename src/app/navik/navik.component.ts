import { Component } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-navik',
  templateUrl: './navik.component.html',
  styleUrls: ['./navik.component.css']
})
export class NavikComponent {
  constructor(public authService: AuthService){ }
}
