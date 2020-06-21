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
<<<<<<< HEAD
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

=======
import { map } from 'rxjs/operators';
>>>>>>> ca89694838b08bb2d12f46dd7d0096499515e4a0

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  likeValue: number;
  visible: boolean;

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
              private fireDB: AngularFireDatabase) {

      this.likeValue = 0;
      this.storage.get('userid').then(key => {
        console.log('Userkey in TAb1 ', key);
        this.checkForCurrentUserProfile(key);
        this.checkForBlockedUserProfile(key);

        this.userkey = key;
      });


  }
 ngOnInit() {
  this.loadedposts = this.dataS.getPosts();
  
 

  // this.dataS.getPosts().subscribe((PostData:any[])=>{
    // console.log("likeuserid ", PostData);
    // PostData.forEach(element =>{
      
      // this.likedPosts = this.getlikedPosts(element.postID);

    //  this.likedPosts = this.getlikedPosts(element.postID).subscribe((likeData:any[])=>{
        
    //     console.log("like data after ", likeData);
    //     likeData.forEach(ele=>{
    //         console.log("naving test",ele.key);
    //         this.likeData = ele.key;
    //         if(ele.key === this.userkey){
    //           this.visible = true;
    //         }else{
    //           this.visible = false;
    //         }
    //     });
        
    //   });
      
    // });
  // });
  
  
  console.log("New like Data",)

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

  ngOnDestroy(): void {
    this.backButtonSubscribtion.unsubscribe();

  }

   checkForBlockedUserProfile(userkey) {
    this.itemsRef = this.database.object(`/Profiles/${userkey}`);
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.valueChanges();
    this.items.subscribe(data =>{
      console.log("Blocked data ", data.isBlocked);
      
      if(data.isBlocked === true){
       this.router.navigate(['/blocked-user']);
      }
      
    }) 
   


  }

  checkForCurrentUserProfile(key){
    this.profileRef = this.database.list(`/Profiles/${key}`).valueChanges().subscribe(profile =>{
      if(profile.length > 0){
        console.log("Checking profile...",profile);
      }else{
        this.router.navigate(['/profile',key]);
        
      }
      
    })
    
  }

  reportPost(postid, post) {
    console.log(postid);
    this.database.list(`reportedPosts/${postid}`).push(post);

  }
openAllCommentsPage() {
  console.log('Open Comments Page');


}

addLike(post) {

  console.log('value', post.likes);
  console.log('key', post.key);
  console.log('like-->', this.userkey);

  this.dataS.addLike(post.key, post.likes);

  this.dbRef = this.fireDB.database.ref(`Posts/${post.key}/likedBy`);
  this.dbRef.child(this.userkey).set(true);

}

addDisLike(post) {
  console.log('key', post.key);
  console.log('Post Id', post.postID);
  console.log('value', post.likes);
  console.log('Dislike-->', this.userkey);

  this.dataS.disLike(post.key, post.likes);

  this.dbRef = this.fireDB.database.ref(`likedBy/${post.postID}`);
  this.dbRef.child(this.userkey).remove();


}


onPostActionOpen(){

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
        this.database.list(`reportedPosts/${item.key}`).push(item);
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



