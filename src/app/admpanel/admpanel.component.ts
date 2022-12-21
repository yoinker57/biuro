import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { TripsService } from "../services/trips.service";
import { find, Subscription } from 'rxjs';
import { User } from "../User";

@Component({
  selector: 'app-admpanel',
  templateUrl: './admpanel.component.html',
  styleUrls: ['./admpanel.component.css']
})
export class AdmpanelComponent implements OnInit {
  selectedPersistence: string;
  users: User[] = [];
  usersSub: Subscription | undefined;


  constructor( private authService: AuthService, private db: TripsService ){
    this.selectedPersistence = authService.persistance
  }

  ngOnInit(): void {
    console.log(this.authService?.userData);
    this.usersSub = this.db.getUsers().subscribe((users) => {
      this.users = [];
      for (let user of users) {
        let tmp = new User(user.payload.val());
        console.log(user.payload.val());
        tmp.uid = user.payload.key || 'undefined';
        this.users.push(tmp);
      }
    });
  }

  changePersistance(){
    this.authService.changePersistence(this.selectedPersistence)
  }

  setRole(uid: String, role: string, flag: boolean){
    this.db.setRole(uid, role, flag)
  }
}
