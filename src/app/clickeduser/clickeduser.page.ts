import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clickeduser',
  templateUrl: './clickeduser.page.html',
  styleUrls: ['./clickeduser.page.scss'],
})
export class ClickeduserPage implements OnInit {

  userid;
  username;

  messageRight;

  user = '';
  message = '';
  msglist = [];

  loggeduserkey;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private storageLocal: Storage) {
  

   }

  ngOnInit() {
    this.userid = this.route.snapshot.paramMap.get('key');
    this.username = this.route.snapshot.paramMap.get('username');
    this.loggeduserkey = this.route.snapshot.paramMap.get('loggeduserkey');

    

    this.db.list('privateChatMessages').valueChanges().subscribe((msg: any[]) =>{
      //console.log(msg);
      this.msglist = [];
      msg.forEach(ele =>{
        if(ele.receiver === this.userid && ele.sender === this.loggeduserkey ||
            ele.receiver === this.loggeduserkey && ele.sender === this.userid ){
            console.log(ele);
            this.msglist.push(ele);
            return;
          }

      })
      //console.log(this.msglist);
      
      
    })
    



  }


  sendMessage() {
    console.log("loggkey ",this.loggeduserkey);
    console.log("clickeduser ",this.userid);

    this.db.list(`privateChatMessages/`).push({
      receiver: this.userid,
      sender: this.loggeduserkey,
      message: this.message
    });
    this.message = '';
    
  }


}
