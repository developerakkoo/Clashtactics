import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private iab:InAppBrowser) { }

  ngOnInit() {
  }

  openDjangoApp(){
    this.iab.create('https://clashtactic.herokuapp.com/admin','_self');
  }

  openMatchApp(){
    this.iab.create('https://clashtactic.herokuapp.com','_self');


  }
}
