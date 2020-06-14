import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  title;
  imageUrl;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;


  constructor(private database: AngularFireDatabase,
              private storage: AngularFireStorage) {
    this.itemsRef = this.database.list(`/Layouts/`);
    this.items = this.itemsRef.snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
  
   }

  addlayout(title: string, description: string , imageurl: string, username: string, townhallid: string) {
    this.itemsRef.push({
      title,
      description,
      imageUrl: imageurl,
      username,
      published_at: new Date().toISOString(),
      likes: 0,
    });

  }

  getLayouts() {
    return this.items;
  }

  addLike(key: string, value: number) {
    const like = value + 1;
    this.itemsRef.update(key, {
      likes: like
    });
  }

  disLike(key: string, value: number) {
    const like = value - 1;
    this.itemsRef.update(key, {
      likes: like
    });

  }

  addComment(key: string, comment: string, username: string) {
  }

  getComment() {
  }
}
