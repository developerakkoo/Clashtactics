import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from './authservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form: FormGroup;
  name: string;
  isPolicyAccepted = true;

  userkey;

  userKeyFound: Boolean = false;


  constructor(private auth: AuthserviceService,
              private route: Router,
              private toastController: ToastController,
              private ActiveRoute: ActivatedRoute,
              private storageLocal: Storage) {

                this.userkey = this.ActiveRoute.snapshot.paramMap.get('userkey');
                console.log(this.userkey);

                this.storageLocal.get('userid').then(val => {
                  console.log('Got into login page the userid', val);
                  if(val !== ""){
                    this.userKeyFound = true;
                  }

                  });
               }

  ngOnInit() {



    console.log("USER KEY DFOUND",this.userKeyFound);
    
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]}),
      policy: new FormControl(null, {validators: [Validators.required]} )
    });
  }

  onLoginUser() {
    if (!this.form.valid) {
      this.presentToast('You need to fill all details and Accept out Policy!');
    }

    this.auth.login(this.form.value.email, this.form.value.password);

  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  openPolicy() {
    this.route.navigateByUrl('/policy');
  }

}
