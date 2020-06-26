import { Key } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  loggedUserKey;
  loggedUserImage;
  loggedUserName;


  clickedUserKey;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  profile: any[];
  profilelist: any[];

  query: string;

  constructor(private iab: InAppBrowser, 
              private database: AngularFireDatabase, private authF: AngularFireAuth, 
              private router: Router, private storageLocal: Storage,
              private route: ActivatedRoute) {
    
                this.storageLocal.get('userid').then(val => {
                  console.log('Got into log', val);
                  this.loggedUserKey = val;
                  this.itemsRef = database.list(`/privateUserChatList/${val}`);
                  // Use snapshotChanges().map() to store the key
                  this.items = this.itemsRef.snapshotChanges().pipe(
                    map(changes => 
                      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
                    )
                  );
                  });
            
  }


  ngOnInit() {
    

    console.log("Logged userkey from storage", this.loggedUserKey);
    

  }

  deleteUser(key, slidebtn){
    console.log("deleteuser ",key);
    this.itemsRef.remove(key);
    slidebtn.close();
    this.router.navigate(['/tabs/tab3', this.loggedUserKey])
  
      }


  gotouser(key: string, username: string) {
    console.log(key);
    this.router.navigate(['/clickeduser/', key, username, this.loggedUserKey]);

  }


  searchUser(firstname: string) {
    const query = this.database.list('/Profiles', ref => ref.orderByChild('firstname').startAt(firstname));
    return query.valueChanges();
  }


  search(firstname: string){
    
  }
  searchuser(query: string) {
    const trimmedquery = query.trim();
    const loadedQuery = trimmedquery;


    console.log('Searchuser', query);
    if (trimmedquery === query) {
      this.searchUser(query.toLowerCase()).subscribe(profiles => {
        console.log(profiles);

        this.profilelist = profiles;
      });

    }

  }


  openUserListPage(){
    this.router.navigate(['/user-list',this.loggedUserKey]);
  }
}
