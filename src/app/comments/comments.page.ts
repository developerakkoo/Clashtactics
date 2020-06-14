import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { DataService } from './../createpost/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  id;
  userId;
  comment;
  username;

  databaseref;

allComments: Observable<any[]>;



constructor(private database: AngularFireDatabase, private router: Router,
            private dataS: DataService, private route: ActivatedRoute,
            private storageLocal: Storage,
            private toastCtrl: ToastController) { }

ngOnInit() {




   this.id = this.route.snapshot.paramMap.get('id');
   this.userId = this.route.snapshot.paramMap.get('userkey');
   console.log("userid in comment ",this.userId);

   console.log("post id in comment",this.id);


   this.database.object(`Profiles/${this.userId}`).valueChanges().subscribe(user =>{
    
    this.username = user;
    
  })

  
   /* this.storageLocal.get('userid').then(val => {
    console.log('Got into log', val);
    this.userId = val;
    });

    this.storageLocal.get('username').then(val => {
      console.log('Got into log', val);
      this.username = val;
    }); */
   this.databaseref = this.database.list('/comments');
   this.allComments = this.database.list(`/comments/${this.id}`).valueChanges();

   console.log(this.allComments);


  }


onAddComment() {

    console.log('comment', this.comment);
    console.log('id: ', this.id);
    console.log('Username: ', this.username);
    if (this.comment) {
      this.database.list(`/comments/${this.id}`).push({
        username: this.username.username,
        comment: this.comment
      });
    } else {
this.presentToast('You need to add comment first...');
    }



  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
