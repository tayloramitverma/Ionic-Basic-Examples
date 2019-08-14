import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {


  items = [
    { text: 'My first green item', color: '#00ff00' },
    { text: 'My second red item', color: '#ff0000' },
    { text: 'My third blue item', color: '#0000ff' }
  ];
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getDynamicColor(color) {
    return this.sanitizer.bypassSecurityTrustStyle(`--myvar: ${color}`);
  }

}
