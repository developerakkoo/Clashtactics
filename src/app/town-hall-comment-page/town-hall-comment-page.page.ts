import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../createpost/data.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-town-hall-comment-page',
  templateUrl: './town-hall-comment-page.page.html',
  styleUrls: ['./town-hall-comment-page.page.scss'],
})
export class TownHallCommentPagePage implements OnInit {
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
    this.username = this.route.snapshot.paramMap.get('username');
    this.id = this.route.snapshot.paramMap.get('postid');


    console.log("username of commenter ", this.username);
    
    this.databaseref = this.database.list('/layoutComments');
    this.allComments = this.database.list(`/layoutComments/${this.id}`).valueChanges();
 
    console.log(this.allComments);
  }


  onAddComment() {

    console.log('comment', this.comment);
    console.log('id: ', this.id);
    console.log('Username: ', this.username);
    if (this.comment) {
      this.database.list(`/layoutComments/${this.id}`).push({
        username: this.username,
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
