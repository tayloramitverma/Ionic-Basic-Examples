import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }

  canActivate(route: ActivatedRouteSnapshot)  {
    const expectedRole = route.data.role;

    return this.auth.user.pipe(
      take(1),
      map(user => {
        console.log(user);
        if (!user) {
          this.showAlert();
          return this.router.parseUrl('/login')
        } else {
          let role = user['role'];

          if (expectedRole == role) {
            return true;
          } else {
            this.showAlert();
            return this.router.parseUrl('/login');
          }
        }
      })
    )
  }

  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Unauthorized',
      message: 'You are not authorized to vist that page!',
      buttons: ['OK']
    });
    alert.present();
  }
}