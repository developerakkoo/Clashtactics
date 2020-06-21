import { AngularFireDatabase } from '@angular/fire/database';
import { async } from '@angular/core/testing';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  isUserAuthenticated = false;
  isAdmin = false;
  loginCounter;

  userid;
  // tslint:disable-next-line:max-line-length
  constructor(private authF: AngularFireAuth , private route: Router, private storage: Storage,
              private loadCtrl: LoadingController, private toastController: ToastController, private database: AngularFireDatabase) {
    this.userid = this.storage.get('userid');
    if(this.userid){
      this.isUserAuthenticated = true;
    }

   }



   getCurrentUser() {
    return this.authF.currentUser;
   }

   getProfile(key: string) {
     this.database.list(`/Profiles/${key}`).valueChanges().subscribe(profile => {
       return profile;
     });
   }


 login(email, password) {
     const loading = this.loadCtrl.create({
      message: 'Please wait! Logging you in...',
      duration: 2000
    });
     loading.then(success => {
      success.present();
    });


     this.authF.signInWithEmailAndPassword(email, password).then(success => {
       this.loginCounter = this.loginCounter + 1;
        this.storage.set('userid', success.user.uid);
       this.isUserAuthenticated = true;
       this.route.navigate(['/tabs/tab1/', success.user.uid]);
       console.log(success.additionalUserInfo.isNewUser);


    }).catch(err => {
      this.presentToast(err);
      loading.then(async success => {
        (await loading).dismiss();
      });

    });

  }




  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  logout() {
    this.authF.signOut();
    this.route.navigate(['/auth']);
    this.isUserAuthenticated = false;
  }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Please wait...Logging you In...',
      duration: 2000
    });
    await loading.present();

}
}
