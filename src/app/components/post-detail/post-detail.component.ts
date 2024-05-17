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

  post: Post = {
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mySubscription = this.postService.fetchPost(id).subscribe(post => {
      if (post) {
        this.post = post;
      }
      else {
        alert('Post Not Found!!!')
      }
    });

  }

  onEditPost(id : number){
    this.router.navigate(['/edit',this.post.id]);
  }

  onDeletePost(id : number){
    this.postService.deletePost(id);
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
