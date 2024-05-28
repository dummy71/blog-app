import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [] ;
  mySubscription !: Subscription;

  selectedPost : Post = {
    id: 0,
    title: '',
    content: '',
    author: '',
    date: 0,
    tags: [],
    imageUrl: ''
  };

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.mySubscription = this.postService.getUpdatedList().subscribe(
      (postList: Post[]) => {
        this.posts = [...postList];
      },
      error => {
        console.error('Error fetching data:', error);
      }
    )
  }

  fetchPostById(id: number): void {
    this.postService.fetchPost(id).subscribe((postData: Post | undefined) => {
      if (postData) {
        this.selectedPost = postData;
      } else {
        console.error('Post not found.');
        // Optionally, handle the case where the post is not found
      }
    });
  }

  ngOnDestroy(): void {
      this.mySubscription.unsubscribe();
  }
}
