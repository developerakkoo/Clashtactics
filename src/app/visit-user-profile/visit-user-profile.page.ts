import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-user-profile',
  templateUrl: './visit-user-profile.page.html',
  styleUrls: ['./visit-user-profile.page.scss'],
})
export class VisitUserProfilePage implements OnInit {


  userkey;
  firstname;
  lastname;
  username;
  isVerified;
  imageurl;
  status;
  user: any[];
  loggedUserKey;



  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private database: AngularFireDatabase,
              private storageLocal: Storage) {
    this.userkey =  this.route.snapshot.paramMap.get('userkey');
    this.storageLocal.get('userid').then(val => {
      console.log('loggeduser in visit profile', val);
      this.loggedUserKey = val;
      
      });
   }

  ngOnInit() {
    console.log("Profile visited with key", this.userkey);
    this.database.list(`/Profiles/${this.userkey}/`).valueChanges().subscribe(userdata =>{

      console.log(userdata);
      
      this.firstname = userdata[0];
      this.lastname =  userdata[5];
      this.imageurl = userdata[1];
      this.username = userdata[7];
      this.status = userdata[6];
      this.isVerified = userdata[3];
    })
    
  }
  onSendMessage(){
    console.log("send by", this.loggedUserKey);
    console.log("username", this.username);
    console.log("userimg", this.imageurl);
    console.log("userkey", this.userkey);
    
    
    
    
     this.database.list(`privateUserChatList/${this.loggedUserKey}`).push({
      username: this.username,
      userimage: this.imageurl,
      userkey: this.userkey
    });
    this.router.navigate(['/tabs/tab3',  this.loggedUserKey]); 
    

  }

}
