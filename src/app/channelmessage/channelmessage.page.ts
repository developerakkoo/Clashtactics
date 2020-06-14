import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-channelmessage',
  templateUrl: './channelmessage.page.html',
  styleUrls: ['./channelmessage.page.scss'],
})
export class ChannelmessagePage implements OnInit {

  channelkey;
  channelname;

  userId;
  username;
  message;

  channelMessages;
  constructor(private activeRoute: ActivatedRoute,
    private database: AngularFireDatabase,
    private alertCtrl: AlertController,
    private storageLocal: Storage) { 
      let channel =  this.activeRoute.snapshot.paramMap.get('channel');
      let channelname =  this.activeRoute.snapshot.paramMap.get('channelname');
   
      this.channelkey = channel;
      this.channelname = channelname;
    }

  ngOnInit() {
    let msg = this.getChannelChatRef(this.channelkey).subscribe(channelmsg =>{
      this.channelMessages = channelmsg;
    })

    this.storageLocal.get('userid').then(val => {
      console.log('Got into log', val);
      this.userId = val;
      this.database.list(`Profiles/${val}`).valueChanges().subscribe(user =>{
        console.log("database data",user);
        //this.userimage = user[1];
        this.username = user[7];
        
      })
      });
  }




  sendMessage() {
    console.log(this.message);
    

    let channelMessage = {
      username : this.username,
      content: this.message
    };
    console.log(channelMessage);
    

    this.sendMessageToChannel(this.channelkey, channelMessage);
  }


  //Get reference to the channel
getChannelListRef() {
  return this.database.list('channels-name/');
}
//get reference to the channel key
getChannelChatRef(channelKey: string) {
  return this.database.list(`channels/${channelKey}`).valueChanges();
}

// Send Message to the Channel
sendMessageToChannel(channelKey: string, message: any){
  return this.database.list(`/channels/${channelKey}`).push(message);
}
}
