import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  title;
  imageUrl;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  likedPosts: Observable<any[]>


  

constructor(private database: AngularFireDatabase,
            private storage: AngularFireStorage) {

  this.itemsRef = this.database.list(`/Posts/`);
  this.items = this.itemsRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
}

    makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }

    addpost(title: string, imageurl:string, username: string, userimage: string, userkey: string, userVerified: boolean) {
      this.itemsRef.push({
        postID: this.makeid(10),
        title: title,
        imageUrl: imageurl,
        username: username,
        userimage: userimage,
        userkey: userkey,
        userVerified: userVerified,
        published_at: new Date().toISOString(),
        likes: 0,
      });

    }

    getPosts(){
      return this.items;
    }

    addLike(key:string, value: number){
      let like = value + 1;
      this.itemsRef.update(key,{
        likes: like
      })
    }

    disLike(key: string, value: number){
      let like = value -1;
      this.itemsRef.update(key, {
        likes: like
      });
    }



    addComment(key: string, comment: string, username: string){


    }

    getComment(){

    }
}
