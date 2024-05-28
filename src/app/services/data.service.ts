import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://blogg-app-4e43a-default-rtdb.firebaseio.com/posts';

  constructor(private http: HttpClient) {}

  addPost(post: Post): Observable<any> {
    return this.http.post(`${this.baseUrl}.json`, post);
  }

  fetchPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}.json`);
  }

  updatePost(id: number, post: Post): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}.json`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}.json`);

  }
}
