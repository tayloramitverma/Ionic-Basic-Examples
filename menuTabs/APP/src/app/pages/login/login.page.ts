import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  user = {
    email: '',
    pw: ''
  };

  email: any;
  password: any;

  constructor(private auth: AuthService,
    private router: Router,
    private toastController: ToastController) {}

  ngOnInit() {}
  
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      position: "bottom",
      duration: 1000,
      color: "secondary"
    });
    toast.present();
  }

  signIn() {
    this.auth.signIn(this.user).subscribe(user => {
      let role = user['role'];
      if (role == 'USER') {
        this.router.navigateByUrl('/home');
      } else if (role == 'ADMIN') {
        this.router.navigateByUrl('/menu/second');
      }
    });
  }

  onLoginClick() {
    this.auth.loginuser(this.email, this.password).subscribe(
      (data: {}) => {
        console.log(data);
        if (data["status"]) {
          if( data['message']!= 'Success'){
            this.presentToast(data["message"]);
          }else if(data['message']=== 'Success'){
            this.presentToast(data["message"]);
            this.router.navigateByUrl('/menu/second');
          }
          
        }
      },
      err => {
        this.presentToast("Server error");
      }
    );
  }

}