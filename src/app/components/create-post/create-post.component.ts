import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  myBlogForm !: FormGroup;

  constructor(private postService: PostService,private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.myBlogForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.minLength(20)]),
      author: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      imageUrl : new FormControl('', [Validators.required, Validators.pattern('^https?://.*')]),
    })
  }

  onSubmit(form : FormGroup){
    if(this.myBlogForm.valid){
      this.postService.addBlogPost(form);
    }
    else{
      alert("Form Invalid!!!")
    }
    // console.log(form.valid);
    // this.postService.addBlogPost(form);
  }

}
