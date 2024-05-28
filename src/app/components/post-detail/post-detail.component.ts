import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  selectedPost : Post = {
    id: 0,
    title: '',
    content: '',
    author: '',
    date: 0,
    tags: [],
    imageUrl: ''
  };
  mySubscription !: Subscription;



  constructor(private route: ActivatedRoute, private router : Router, private postService: PostService) { }

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.mySubscription = this.postService.fetchPost(postId).subscribe(post => {
      if (post) {
        this.selectedPost = post;
      }
      else {
        alert('Post Not Found!!!')
      }
    });
  }

  // fetchPostById(id : number){

  // }

  onEditPost(id : number){
    this.router.navigate(['/edit',this.selectedPost.id]);
  }

  onDeletePost(id : number){
    this.postService.deletePost(id);
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
