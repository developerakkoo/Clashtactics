import { Router, ActivatedRoute } from '@angular/router';
import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ActionSheetController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthserviceService } from '../auth/authservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username;
  firstname;
  lastname;
  imageUrl;
  isAdmin;
  status;

  userId;

  profileUser;
  profile;

  databaseReference;
  storageReference;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private loadingCtrl: LoadingController, 
    private storageLocal: Storage,
     private database: AngularFireDatabase, 
     private auth: AngularFireAuth, 
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute,
    private actionSheet: ActionSheetController,
    private toastCtrl: ToastController,
    private authService: AuthserviceService) { 

  }

  ngOnInit() {

    this.userId = this.route.snapshot.paramMap.get('userkey');
    console.log("User key in profile, ", this.userId);
    this.database.list(`Profiles/${this.userId}`).valueChanges().subscribe(res =>{
      console.log("Got user, in profile", res);
      console.log(res[0]);
      if(res.length >=0){
        this.username = res[7];
      this.firstname = res[0];
      this.lastname = res[5];
      this.imageUrl = res[1];
      
      }
      
      
    })
    
  }
  async presentLoading(msg) {
    const loading = await this.loadingCtrl.create({
      message: msg,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheet.create({
      header: 'Are you sure? You want to delete the account?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.auth.authState.subscribe(a =>{
            this.database.list(`/Profiles`).remove(a.uid);
            a.delete().then(success =>{
              this.presentLoading("Deleting Account....Please wait!");
              this.toastCtrl.create({
                message: "Succesfully Deleted Account!",
                duration: 3000
              }).then(s =>{
                s.present();
              })
              this.authService.logout();
            }).catch(error =>{
              this.presentLoading("You need to Login again To Perform this operation...");
              this.toastCtrl.create({
                message: "Please Login Again To Delete Account!",
                duration: 4000
              }).then(s =>{
                s.present();
              })
              this.authService.logout();
              console.log("errror ",error);
              
            })
          })

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







  getProfile(userkey) {
    this.profileUser = this.database.object(`/profiles/${userkey}`);
    this.profile = this.profileUser.valueChanges().subscribe(res =>{
      console.log(res);
      
    })
  }



  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `/profiles/${this.userId}/`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          this.imageUrl = fileRef.getDownloadURL();
          this.imageUrl.subscribe(url =>{
            this.imageUrl = url;
          })
        }
         )
     )
    .subscribe()


  }
  AddProfile(){
    console.log("Add Window to choose Picture");
  }

  saveProfile(){
    const databaseRef = this.database.object(`/Profiles/${this.userId}`);

    console.log("Save username and picture to database");
    const {username, firstname, lastname} = this;


    databaseRef.set({
      key: this.userId,
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      isBlocked: false,
      isVerified: false,
      imageUrl: this.imageUrl,
      status: this.status
    });

    this.router.navigate(['/editprofile', this.userId]);

  }


  onUserDeleteAccount(){
    this.presentActionSheet();

  }

}
