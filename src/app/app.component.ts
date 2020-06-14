import { Router } from '@angular/router';
import { AuthserviceService } from './auth/authservice.service';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isAdmin = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authS: AuthserviceService,
    private route: Router,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
    
    this.initializeApp();
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('userid').then(val => {
        console.log('Got into log while starting the app', val);
        
        
        });
      this.platform.backButton.subscribeWithPriority(0, () =>{
        this.presentAlertConfirm();
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Do You Really Want to Exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp();

          }
        }
      ]
    });
    await alert.present();

  }


  onLogOut(){
    this.storage.remove("userid");
    this.storage.remove("username");
    this.storage.remove("userimage");
    console.log("Logging You Out!");
    this.authS.logout();
    this.route.navigateByUrl('/auth');
    
  }
}
