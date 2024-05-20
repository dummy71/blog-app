import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-no-posts',
  templateUrl: './no-posts.component.html',
  styleUrls: ['./no-posts.component.css']
})
export class NoPostsComponent implements OnInit {

  posts : Post[] = [];

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

}
