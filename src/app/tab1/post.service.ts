import { Injectable } from '@angular/core';
import {Post} from './post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {
posts: Post[] = [
  new Post(
  "1",
  "Akkoo",
  "23",
  "https://images.unsplash.com/photo-1588529726892-93b3649b15c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1588354349271-4b6d3fef4a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "45"
  ),
   new Post(
  "2",
  "Akshay",
  "233",
  "https://images.unsplash.com/photo-1588534724418-73b75d412ce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1588354349271-4b6d3fef4a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "33"
  )
  
]
  constructor() { }

  getPosts(){
    return this.posts;
  }

   getPost(id: string){
    return {...this.posts.find(p => p.id === id)};

  }
}
