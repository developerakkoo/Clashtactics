import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { Component, OnInit, ViewChild } from '@angular/core';


import { NavParams, IonContent } from '@ionic/angular';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild('scrollElement',{static: false}) content: IonContent;

  userId;
  username;
  userimage;

  message;

  allMessage;

  constructor(private storageLocal: Storage,
              private database: AngularFireDatabase,
              private auth: AngularFireAuth,
              ) {

  }
  ngOnInit() {





    this.allMessage = this.database.list('/messages').valueChanges();

    this.storageLocal.get('userid').then(val => {
      console.log('Got into log', val);
      this.userId = val;
      this.database.list(`Profiles/${val}`).valueChanges().subscribe(user => {
        console.log('database data', user);
        this.userimage = user[1];
        this.username = user[7];

      });
      });


  }


  onsend() {
    console.log(this.username);

    if(this.message <=0){
    return;
    }else{
      this.database.list('/messages').push({
        username: this.username,
        message: this.message,
        imageurl: this.userimage,
        timestamp: new Date().toISOString()
      });
      this.message = '';
      this.content.scrollToBottom(2000);
    }
    

  }
}
