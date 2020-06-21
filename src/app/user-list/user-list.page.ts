import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { throwIfEmpty } from 'rxjs/operators';
import { Key } from 'protractor';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  loggedUserKey;


  profileRef: AngularFireList<any>;
  profiles: Observable<any[]>;


  constructor(private iab: InAppBrowser,
              private database: AngularFireDatabase, private authF: AngularFireAuth,
              private router: Router, private storageLocal: Storage,
              private route: ActivatedRoute, private toastCtrl: ToastController) {
      this.loggedUserKey = this.route.snapshot.paramMap.get('loggeduserkey');
      console.log('Loggeduserkey inside user list:- ', this.loggedUserKey);

     }

  ngOnInit() {
    this.profileRef = this.database.list('Profiles');
    this.profiles = this.profileRef.valueChanges();
   
  }

  onUserAddToChat(user){
    console.log(user);
    console.log(this.loggedUserKey);
    if(user.key === this.loggedUserKey){
      this.toastCtrl.create({
        message: "You Cannot add Yourself to the Chat...",
        duration: 2000
      }).then(success => {
        success.present();
      });
      return;
      
    }
    this.database.object(`privateUserChatList/${this.loggedUserKey}/`).set({
      username: user.username,
      userimage: user.imageUrl,
      key: user.key,
    });
    this.router.navigate(['/tabs/tab3',  this.loggedUserKey]);
    
    
  }
}
