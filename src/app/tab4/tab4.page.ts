import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';

import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  
  channelsList$;
  channelsList =[];

  constructor(private database: AngularFireDatabase, 
    private alertCtrl: AlertController,
    private navCtrl: NavController, 
    private router: Router) { }

  ngOnInit() {
    this.getChannels();
  }

  //Create a channel with a name
  createNewChannel(channelName: string) {
    this.database.list('channels-name/')
        .push({ name: channelName });


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
sendMessageToChannel(channelKey: string, message: string){
  return this.database.list(`/channels/${channelKey}`).push(message);
}


goToChannel(channel) {
  console.log(channel);
  this.router.navigate(['/channelmessage/',{channel: channel.$key, channelname: channel.name}]);
  
}

getChannels() {
  this.channelsList$ = this.getChannelListRef();

  this.channelsList$.snapshotChanges().subscribe((channelsResponse) => {

    this.channelsList = [];

    channelsResponse.forEach((eachChannel) => {

      this.channelsList.push({
        name: eachChannel.payload.val().name,
        $key: eachChannel.key
      })
    });
  });

}

async showAddChannelDialog() {

  let alert = this.alertCtrl.create({
    header: 'Add Channel',
    inputs: [{
      name: 'channelName'
    }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'Cancel'
      },
      {
        text: 'Add',
        handler: (data) => {
          if (data.channelName.trim() !== "") {
            this.createNewChannel(data.channelName);
          }
        }
      }
    ]
  });

  (await alert).present();

}
}
