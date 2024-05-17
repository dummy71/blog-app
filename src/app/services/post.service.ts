import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Post[] = [];
  bloggPost!: Post;
  currId: number = 0;

  formDataSubject: BehaviorSubject<Post> = new BehaviorSubject<Post>({
    id: 0,
    title: '',
    content: '',
    author: '',
    date: 0,
    tags: [],
    imageUrl: ''
  });

  postListSubject :  BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(private route: ActivatedRoute, private router: Router) {}

  addBlogPost(formData: FormGroup): void {
    const title = formData.value.title;
    const content = formData.value.content;
    const author = formData.value.author;
    const tagsString = formData.value.tags;
    const tags: string[] = tagsString ? tagsString.split(',') : [];
    const imageUrl = formData.value.imageUrl;

    if (title && content && author && tags && imageUrl) {
      this.bloggPost = {
        id: ++this.currId,
        title: title,
        content: content,
        author: author,
        date: Date.now(),
        tags: tags,
        imageUrl: imageUrl
      };

      this.posts = [...this.posts, this.bloggPost];
      console.log('Posts service: ', this.posts);

      this.formDataSubject.next(this.bloggPost);
      this.postListSubject.next(this.posts);

      this.router.navigate(['post', this.bloggPost.id]);
    } else {
      console.error('Error: Form data contains null or undefined values.');
    }
  }

  // getFormData() : FormGroup{
  //   return formData;
  // }

  getPosts(): Post[] {
    return this.posts;
  }

  fetchPost(id: number): Observable<Post | undefined> {
    const post = this.posts.find(post => post.id === id);
    return post ? new Observable(observer => {
      observer.next(post);
      observer.complete();
    }) : new Observable();
  }

  updatePost(updatedPost: Post): Observable<Post> {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
      this.postListSubject.next(this.posts);
      return of(updatedPost);
    } else {
      return throwError(() => new Error('Post not found'));
    }
  }

  deletePost(id: number): void {
    this.posts = this.posts.filter(post => post.id !== id);
    this.postListSubject.next(this.posts);
    this.router.navigate(['']);
  }

  getFormData(): Observable<Post> {
    return this.formDataSubject.asObservable();
  }

  getUpdatedList(): Observable<Post[]> {
    return this.postListSubject.asObservable();
  }
}
