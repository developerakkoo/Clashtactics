import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthserviceService } from './../auth/authservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  name: string;
  progress = false;

  constructor(private authS: AuthserviceService, 
              private auth: AngularFireAuth, private loadCtrl: ToastController,
              private route: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null,{validators: [Validators.required]}),
      password: new FormControl(null,{validators: [Validators.required]}),
    })
  }


  onRegisterUser(){
    if(!this.form.valid){
      return;
    }
    this.progress = true;
  
    this.auth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password).then(res =>{

      this.presentLoading("You have Successfully Registered!");
      this.route.navigate(['/auth', res.user.uid]);
      this.progress = false;
    }).catch(err =>{
      this.presentLoading(err);

    })
    
    
    
  }

  async presentLoading(msg) {
    const loading = await this.loadCtrl.create({
      message: msg,
      duration: 2000
    });
    await loading.present();

  }
}
