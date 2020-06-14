import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  query: string;
  profile: any[];
  profilelist: any[];

  constructor(private database: AngularFireDatabase) { }

  ngOnInit() {
    this.database.list('/Profiles').valueChanges().subscribe(user =>{
      this.profile = user;
    })
  }


  searchUser(firstname: string) {
    const query = this.database.list('/Profiles', ref => ref.orderByChild('firstname').equalTo(firstname));
    return query.valueChanges();
  }

  searchuser(query: string){
    const trimmedquery = query.trim()
    const loadedQuery = trimmedquery;


    console.log("Searchuser", query);
    if(trimmedquery === query){
      this.searchUser(query.toLowerCase()).subscribe(profiles =>{
        console.log(profiles);
        
      this.profilelist = profiles;
      });
      
    }

  }


  goToUser(user){
    console.log(user);
    
  }
}
