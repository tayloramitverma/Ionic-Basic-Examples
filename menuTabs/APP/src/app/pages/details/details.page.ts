import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  usersdata:any=[];
  ID : any;
  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
     this.ID = this.route.snapshot.paramMap.get('id');
    //  console.log('dghdhff'+this.ID);
    this.getOneUser(this.ID);
  }

  getOneUser(id){
    this.auth.getOneUser(id).subscribe(
      (data: {}) => {
        console.log(data);
        this.usersdata = data['result'];
      }
    );    
  }

}
