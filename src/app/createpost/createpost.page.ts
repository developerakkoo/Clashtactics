import { DataService } from './data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NavController } from '@ionic/angular';


import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.page.html',
  styleUrls: ['./createpost.page.scss'],
})
export class CreatepostPage implements OnInit {

  constructor(private database: AngularFireDatabase,
              private storage: Storage,
              private dataStorage: AngularFireStorage,
              private router: Router,
              private navCtrl: NavController,
              private dataS: DataService,
              private route: ActivatedRoute,
              
              private readonly afs: AngularFirestore) { 

                this.itemsCollection = afs.collection<any>('Posts');
                // .valueChanges() is simple. It just returns the 
                // JSON data without metadata. If you need the 
                // doc.id() in the value you must persist it your self
                // or use .snapshotChanges() instead. See the addItem()
                // method below for how to persist the id with
                // valueChanges()
                this.items = this.itemsCollection.valueChanges();
              }

  user;
  title;
  imageUrl;


  userId;

  imageId;
  imageNumber = Math.random();
  databaseReference;
  storageReference;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;


  ngOnInit() {

    this.userId = this.route.snapshot.paramMap.get('userkey');
    console.log('Userkey in createpost, ', this.userId);

    this.database.object(`Profiles/${this.userId}`).valueChanges().subscribe(user => {
      // console.log("createpost user data",user.username);
      this.user = user;

    });


    /* this.storage.get('userid').then(val => {
      console.log('Got into log', val);
      this.userId = val;
    });

    this.storage.get('username').then(val => {
      console.log('Got into log', val);
      this.username = val;
    }); */
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `/post/${this.imageNumber}/`;
    const fileRef = this.dataStorage.ref(filePath);
    const task = this.dataStorage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          this.imageUrl = fileRef.getDownloadURL();
          this.imageUrl.subscribe(url => {
            this.imageUrl = url;
          });
        }
         )
     )
    .subscribe();
  }

  post() {
    const {title, imageUrl, user} = this;
   /*  this.itemsCollection.add({
      title: this.title,
      imageUrl: this.imageUrl,
      username: this.user.username,
      userimg: this.user.imageUrl,
      userkey: this.user.key,
      userVerified: this.user.isVerified,
      postkey: this.afs.createId(),
      likes: 0,
      likedBy: []
    }) */
    this.dataS.addpost(this.title, this.imageUrl, this.user.username, this.user.imageUrl, this.user.key, this.user.isVerified);
    this.router.navigate(['/tabs/tab1', this.userId]);


    }
}
