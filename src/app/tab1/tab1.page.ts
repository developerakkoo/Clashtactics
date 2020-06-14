import { AuthserviceService } from './../auth/authservice.service';
import { AlertController, Platform, ActionSheetController } from '@ionic/angular';
import { DataService } from './../createpost/data.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from './post.service';
import {Post} from './post.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { count, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  likeValue: number;
  visible: boolean;

loadedposts: Observable<any[]>;
userkey;

databaseRef: AngularFireList<any[]>;
postId;
post;

likedList =[];



backButtonSubscribtion;


  constructor(private postS: PostService,
              private storage: Storage,
              private database: AngularFireDatabase,
              private route: ActivatedRoute,
              private router: Router,
              private dataS: DataService,
              private alertController: AlertController,
              private auth: AuthserviceService,
              private platform: Platform,
              private actionSheetCtrl: ActionSheetController) {

      this.likeValue = 0;
      this.storage.get('userid').then(key => {
        console.log('Userkey in TAb1 ', key);
        this.checkForCurrentUserProfile(key);
        this.userkey = key;

      });


  }
 ngOnInit() {
  this.loadedposts = this.dataS.getPosts();
  

  }

  ionViewDidEnter() {
    this.backButtonSubscribtion = this.platform.backButton.subscribe(() => {

    });
  }

  ngOnDestroy(): void {
    this.backButtonSubscribtion.unsubscribe();

  }

   checkForCurrentUserProfile(userkey) {
    this.database.list(`blockeduser/${userkey}`).valueChanges().subscribe(res => {
      console.log('check urent user profile', res);
      if (res.includes(userkey)) {
        this.presentAlertConfirm('You are BLOCKED by the ADMIN you cannot move further!');
      } else {
        this.presentWelcomeConfirm('Welcome User! Please Hit OK to continue...');
      }

    });
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

  
  this.database.list(`likedBy/`).push({
    likedUserId: this.userkey,
    likedPostId: post.key
  });

  


  this.database.list(`likedBy/`).valueChanges().subscribe((data: any[]) => {


    this.likedList = [];
    console.log("Liked by obhject", data);
    console.log("likeuserid ", data);
    data.forEach(element =>{
      if(element.likedUserId === this.userkey && post.key === element.likedPostId){
        this.visible = true;
        this.dataS.disLike(post.key,post.likes);
      }else{
        this.visible = false;
        this.dataS.addLike(post.key, post.likes);

      }
    })
    
    
  });
/* 
 if(data.length >0){
      console.log(data.length);
      
      this.visible = true;
      this.dataS.disLike(post.key, post.likes); 
    }else {
     this.visible = false;
      this.dataS.addLike(post.key, post.likes); 
    } 

  }); */


}



onPostActionOpen(){

}

visitUserProfile(userkey){
  this.router.navigate(['/visit-user-profile/',userkey]);
}



addDisLike(post) {
  console.log('key', post.key);
  console.log('value', post.likes);
  console.log('Dislike-->', this.userkey);
  this.visible = true;

  this.dataS.disLike(post.key, post.likes);

}

likedPost(post) {

  // Init my own id
  const myId = this.userkey;
  console.log('Userkey in LikedPost');


  // Fetch the likes for this post in the firebase db
  const postLikersList = this.database.list(`likedBy/${myId}/${post.key}`);
  postLikersList.valueChanges().subscribe();

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



