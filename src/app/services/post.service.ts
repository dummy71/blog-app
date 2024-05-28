import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private currId = 0;

  private formDataSubject: BehaviorSubject<Post> = new BehaviorSubject<Post>({
    id: 0,
    title: '',
    content: '',
    author: '',
    date: 0,
    tags: [],
    imageUrl: ''
  });

  private postListSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(private router: Router, private dataService: DataService) {}

  addBlogPost(formData: FormGroup): void {
    const { title, content, author, tags: tagsString, imageUrl } = formData.value;
    const tags: string[] = tagsString ? tagsString.split(',') : [];

    if (title && content && author && tags && imageUrl) {
      const newPost: Post = {
        id: ++this.currId,
        title,
        content,
        author,
        date: Date.now(),
        tags,
        imageUrl
      };

      this.posts = [...this.posts, newPost];

      this.dataService.addPost(newPost).subscribe(responseData => {
        console.log(responseData);
      });

      this.formDataSubject.next(newPost);
      this.postListSubject.next(this.posts);

      this.router.navigate(['post', newPost.id]);
    } else {
      console.error('Error: Form data contains null or undefined values.');
    }
  }

  getPosts(): Post[] {
    return this.posts;
  }

  fetchPost(id: number): Observable<Post | undefined> {
    return this.dataService.fetchPostById(id).pipe(
      catchError(error => {
        console.error('Error fetching post:', error);
        return of(undefined);
      })
    );
  }

  updatePost(updatedPost: Post): Observable<Post> {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      return this.dataService.updatePost(updatedPost.id, updatedPost).pipe(
        catchError(error => {
          console.error('Error updating post:', error);
          return throwError(() => new Error('Post not found'));
        })
      );
    } else {
      return throwError(() => new Error('Post not found'));
    }
  }

  deletePost(id: number): void {
    this.dataService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.postListSubject.next(this.posts);
      this.router.navigate(['']);
    });
  }

  getFormData(): Observable<Post> {
    return this.formDataSubject.asObservable();
  }

  getUpdatedList(): Observable<Post[]> {
    return this.postListSubject.asObservable();
  }
}
