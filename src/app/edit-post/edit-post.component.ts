import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model'
import { error } from 'console';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  editForm !: FormGroup;
  postId : number = 0;
  updatedPost : Post = {
    id: 0,
    title: '',
    content: '',
    author: '',
    date: 0,
    tags: [],
    imageUrl: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
            id: [0],
            title: ['', Validators.required],
            content: ['', Validators.required],
            author: ['', Validators.required],
            tags: ['',Validators.required],
            imageUrl: ['', Validators.required]
          });

    this.route.params.subscribe(params => {
      this.postId = Number(params['id']);
      this.postService.fetchPost(this.postId).subscribe((post: Post | undefined) => {
        if (post) {
          this.editForm.patchValue(post);
        } else {
          console.log('Post not found!!');
        }
      });
    });
  }

  onSubmit(formData : FormGroup): void {
    if(this.editForm.valid){
      const tagsString = formData.value.tags;
      const tags: string[] = typeof tagsString === 'string' ? tagsString.split(',') : [];
      this.updatedPost = {
        id : this.postId,
        ...formData.value,
        date : Date.now(),
        tags : tags
      }
      this.postService.updatePost(this.updatedPost).subscribe(()=>{
          this.router.navigate(['']);
      },error => {
        alert('Error Updating Post!!!')
      });
    }
    else{
      alert("Form Invalid!!!")
    }
  }
}
