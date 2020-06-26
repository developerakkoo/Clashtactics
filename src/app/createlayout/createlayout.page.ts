import { LayoutService } from './layout.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from '../createpost/data.service';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-createlayout',
  templateUrl: './createlayout.page.html',
  styleUrls: ['./createlayout.page.scss'],
})
export class CreatelayoutPage implements OnInit {
  username;
  userImage;
  title;
  description;
  imageUrl;

  townHallId;

  userId;

  imageId;
  imageNumber = Math.random();
  databaseReference;
  storageReference;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private database: AngularFireDatabase,
              private storage: Storage,
              private dataStorage: AngularFireStorage,
              private router: Router,
              private navCtrl: NavController,
              private dataS: LayoutService,
              private route: ActivatedRoute) { }

  ngOnInit() {


    this.storage.get('userid').then(val => {
      console.log('Got into log', val);
      this.userId = val;
      this.database.list(`Profiles/${val}`).valueChanges().subscribe(user =>{
        console.log("database data",user);
        this.username = user[7];
        this.userImage = user[1];
        
      })
      });

    this.townHallId = this.route.snapshot.paramMap.get('id');


  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `/layout/${this.townHallId}/${this.imageNumber}/`;
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
    const {title, imageUrl, username} = this;
    this.addlayout(this.title, this.imageUrl, this.username, this.townHallId);
    this.router.navigate(['/townhallsection', this.townHallId]);


    }
  addlayout(title: any, imageUrl: any, username: any, townHallId: any) {
    this.database.list(`Layouts/${this.townHallId}`).push({
      id: townHallId,
      title: title,
      imageUrl: imageUrl,
      username: username,
      published_date: new Date().toISOString(),
      userImage: this.userImage,
      likes:0,
    });
  }
}
