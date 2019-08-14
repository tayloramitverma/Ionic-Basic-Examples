import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(private theme: ThemeService,
    private auth: AuthService) { }

  ngOnInit() {
  }

  enableDark() {
    this.theme.enableDark();
  }
 
  enableLight() {
    this.theme.enableLight();
  }

  

  signOut() {
    this.auth.signOut();
  }

}
