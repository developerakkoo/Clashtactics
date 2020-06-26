import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-townhallsection',
  templateUrl: './townhallsection.page.html',
  styleUrls: ['./townhallsection.page.scss'],
})
export class TownhallsectionPage implements OnInit {

  townHallId;

  userId;
  username;


  likeValue: number;
  visible = true;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private route: ActivatedRoute, private storageLocal: Storage, private router: Router,
              private database: AngularFireDatabase) {

                this.townHallId = this.route.snapshot.paramMap.get('id');
                this.storageLocal.get('userid').then(val => {
                  console.log('Got into log', val);
                  this.userId = val;
                  this.database.list(`Profiles/${val}`).valueChanges().subscribe(user => {
                    console.log('database data', user);
                    this.username = user[7];
            
                  });
                  });


      this.itemsRef = database.list(`Layouts/${this.townHallId}`,  ref => ref.orderByChild('id').equalTo(this.townHallId));
    // Use snapshotChanges().map() to store the key
      this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  ngOnInit() {


    /* 
    this.itemsRef = this.database.list(`Layouts/${this.townHallId}`,  ref => ref.orderByChild('id').equalTo(this.townHallId));

    this.items = this.itemsRef.valueChanges(); */

    
  }

  onOpenAddLayoutPage() {
    this.router.navigate(['/createlayout', this.townHallId, this.userId]);
  }

  /* addLike(key: string, value: number) {
    this.visible = false;
    const like = value + 1;
    console.log('key', key);
    console.log('value', value);
    console.log('like value ', like);

    this.itemsRef.update(key, {
      likes: like
    });

    /* this.database.list(`Layouts/${this.townHallId}`).update(key,{
      likes: like
    }) 
  }
 */
  addLike(post, event) {
  
    let postid;
    this.storageLocal.get(post.key).then(postid =>{
      postid = postid;
      if(postid === post.key){
        console.log("DISLIKE");
        let like = event -1;
      this.visible = true;
      this.itemsRef.update(post.key, {
        likes: like
      });
      
        this.storageLocal.remove(post.key);
        
      }else{
        let like = event + 1;
      this.visible = true;
      this.itemsRef.update(post.key,{
        likes: like
      });
        this.storageLocal.set(post.key, post.key).then(s =>{
          console.log("stored id like", s);
          
        }).catch(e =>{
          console.log("error like", e);
          
        })
        console.log('key', post.key);
      
        
        console.log('like-->', this.userId);
       
     
      }
      
      
  
    })
    console.log("POST ID STORAGE", postid);
    console.log("Like Event:- ", postid === post.key);
    
   
    
    
    
  
  
  }

  addDisLike(key: string, value: number) {
    this.visible = true;
    const like = value - 1;
    console.log('key', key);
    console.log('value', value);
    console.log('like value ', like);
    this.itemsRef.update(key, {
      likes: like
    });
  }

  addcomment(postId: string) {
    console.log('User Commented', postId);
    this.router.navigate(['/town-hall-comment-page', postId, this.username]);
  }

}
