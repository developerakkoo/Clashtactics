import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit , OnDestroy{

  user;

  isUserProfileLoaded = false;
  userId;

  constructor(private database: AngularFireDatabase,
              private storageLocal: Storage,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnDestroy() {
  

  }

  ngOnInit() {

    this.userId = this.route.snapshot.paramMap.get('userkey');


    this.storageLocal.get('userid').then(val => {
      console.log('Got into log', val);
      this.userId = val;

      this.database.object(`/Profiles/${val}`)
      .valueChanges().subscribe(user => {
        console.log(user);

        this.user = user;
        this.isUserProfileLoaded = true;
      });


    });


  }

  onEditProfile() {
    console.log("Edit Profile");
    
    this.router.navigate(['/profile', this.userId]);

  }

}
