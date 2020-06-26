import { async } from '@angular/core/testing';
import { AuthserviceService } from './../auth/authservice.service';
import { AlertController, Platform, ActionSheetController } from '@ionic/angular';
import { DataService } from './../createpost/data.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from './post.service';
import {Post} from './post.model';
import 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { count, tap } from 'rxjs/operators';

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { getLocaleDateFormat } from '@angular/common';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  likeValue: number;
  visible: boolean;
  isUserVerified;

loadedposts: Observable<any[]>;
likedPosts: any;
likeData: any[];
PostLikes: [];
userkey;

databaseRef: AngularFireList<any[]>;
dbRef: any;

postId;
post;

likedList =[];
profileRef;
itemsRef;
items;
backButtonSubscribtion;

block;

private itemsCollection: AngularFirestoreCollection<any>;
Postitems: Observable<any[]>;

heartType;
postID;
isClicked;
counter = 0;

  constructor(private postS: PostService,
              private storage: Storage,
              private database: AngularFireDatabase,
              private route: ActivatedRoute,
              private router: Router,
              private dataS: DataService,
              private alertController: AlertController,
              private auth: AuthserviceService,
              private platform: Platform,
              private actionSheetCtrl: ActionSheetController,
              private fireDB: AngularFireDatabase,
              private sqlite: SQLite,
              
              private readonly afs: AngularFirestore) {

      this.likeValue = 0;
      this.storage.get('userid').then(key => {
        console.log('Userkey in TAb1 ', key);
        this.checkForCurrentUserProfile(key);
        this.checkForBlockedUserProfile(key);

        this.userkey = key;
      });

      this.itemsCollection = afs.collection<any>('Posts');
     
      this.Postitems = this.itemsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    



  }


 ngOnInit() {
  this.loadedposts = this.dataS.getPosts();
 console.log("Post Items", this.Postitems);


  }




  likeBTN(postdID: string){
    this.getlikedPosts(postdID).subscribe((likeData:any[])=>{
        
      console.log("like data after ", likeData);
      likeData.forEach(ele=>{
          console.log("naving test",ele.key);
          this.likeData = ele.key;
          if(ele.key === this.userkey){
            return true;
          }else{
            return false;
          }
      });
      
    });
  }




  getlikedPosts(postID){
    this.databaseRef = this.database.list(`/likedBy/${postID}`);
      this.likedPosts = this.databaseRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        ) 
      );
      return this.likedPosts;
  }

  



  ionViewDidEnter() {



    this.backButtonSubscribtion = this.platform.backButton.subscribe(() => {

    });
  }




  ngOnDestroy() {

    this.backButtonSubscribtion.unsubscribe();

  }



   checkForBlockedUserProfile(userkey) {
    this.itemsRef = this.database.object(`/Profiles/${userkey}`);
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.valueChanges();
    this.items.subscribe(data =>{
      console.log("Blocked data ", data.isBlocked);
      console.log("VErified data:-", data.isVerified);
      this.isUserVerified = data.userVerified;
      
      if(data.isBlocked === "true"){
       this.router.navigate(['/blocked-user']);
      }
      
    }) 
   


  }


  checkForCurrentUserProfile(key){
    this.profileRef = this.database.list(`/Profiles/${key}`).valueChanges().subscribe(profile =>{
      if(profile.length > 0){
        console.log("Checking profile...",profile);
        this.isUserVerified = profile[3];
      }else{
        this.router.navigate(['/profile',key]);
        
      }
      
    })
    
  }

  reportPost(postid, post) {
    console.log(postid);
    this.database.list(`reportedPosts`).push(post);

  }

openAllCommentsPage() {
  console.log('Open Comments Page');
}


toogleLike(heartType){
  heartType = heartType == "heart" ? "heart-outline": "heart";
}

addLike(post, event) {
  
  let postid;
  this.storage.get(post.key).then(postid =>{
    postid = postid;
    if(postid === post.key){
      console.log("DISLIKE");
      this.dataS.disLike(post.key, post.likes);
      this.storage.remove(post.key);
      
    }else{
      this.storage.set(post.key, post.key).then(s =>{
        console.log("stored id like", s);
        
      }).catch(e =>{
        console.log("error like", e);
        
      })
      console.log('key', post.key);
    
      
      console.log('like-->', this.userkey);
     
      this.dataS.addLike(post.key, post.likes);
      this.counter = this.counter + 1;
      this.visible = true;
      console.log("Like Counter:- ", this.counter);
    }
    
    

  })
  console.log("POST ID STORAGE", postid);
  console.log("Like Event:- ", postid === post.key);
  
 
  
  
  


}





visitUserProfile(userkey){
  this.router.navigate(['/visit-user-profile/',userkey]);
}


addcomment(key: string) {
  console.log('User Commented');
  this.router.navigate(['/comments', key, this.userkey]);
}

goToCreatePostPage() {
  this.router.navigate(['/createpost', this.userkey]);
}

async presentAlertConfirm(message: string) {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message,
    buttons: [
       {
        text: 'Okay',
        handler: () => {
          this.router.navigate(['/auth', this.userkey]);
        }
      }
    ]
  });

  await alert.present();
}
async presentWelcomeConfirm(message: string) {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message,
    buttons: [
       {
        text: 'Okay',
        handler: () => {
          this.router.navigate(['/profile', this.userkey]);
        }
      }
    ]
  });

  await alert.present();
}

async presentActionSheet(item) {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Choose',
    cssClass: 'my-custom-class',
    buttons: [{
      text: 'Report',
      role: 'destructive',
      icon: 'warning-outline',
      handler: () => {
        console.log(item);
        this.database.list(`reportedPosts`).push({
          title: item.title,
          postkey: item.key,
          imageurl: item.imageUrl,
          username: item.username
        });
      }
    },  {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}
}



