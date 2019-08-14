import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';
 
  pages = [
    {
      title: 'Dashboard',
      url: '/menu/first'
    },
    {
      title: 'APP Users',
      url: '/menu/second'
    },
    {
      title: 'My Notes',
      url: '/menu/notes'
    }
  ];

  constructor(private router: Router,private auth: AuthService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {

  }

  signOut() {
    this.auth.signOut();
  }

}