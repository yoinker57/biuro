import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { TripsService } from '../services/trips.service';

@Injectable({
  providedIn: 'root'
})
export class ModerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private tripService: TripsService) {}
  async canActivate(): Promise<boolean> {
    const auth = await this.authService.getCurrentUser();
    var temp = auth as any;
    if (temp == null) {
      this.router.navigate(['']);
      return false;
    }
    const role = await this.tripService.getUserRoles(temp.uid);
    var role2 = role as any;
    if (role2.menager) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
