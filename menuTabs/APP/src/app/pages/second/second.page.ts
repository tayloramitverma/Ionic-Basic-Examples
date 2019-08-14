import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
  usersdata: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.getUsers();
  }

  signOut() {
    this.auth.signOut();
  }

  getUsers(){
    this.auth.getUsers().subscribe(
      (data: {}) => {
        console.log(data);
        this.usersdata = data['result'];
      }
    );    
  }

}
