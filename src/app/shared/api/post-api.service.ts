import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FireBaseCreatePostResponse } from '../interfaces/farebase-create-post-response';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<Post> {
    return this.http.post(`${environment.dbUrl}/posts.json`, post).pipe(map((response: FireBaseCreatePostResponse) => {
      return {
        ...post,
        id: response.name,
        date: new Date(post.date)
      }
    }))
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(`${environment.dbUrl}/posts.json`).pipe(map((response: { [key: string]: any }) => {
      return Object.keys(response).map(key => (
        {
        ...response[key],
        date: new Date(response[key].date),
        id: key
      }))
    }))
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.dbUrl}/posts/${id}.json`).pipe(map((post: Post) => {
      return {
        ...post,
        id,
        date: new Date(post.date)
      }
    }))
  }

  removePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.dbUrl}/posts/${id}.json`);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.dbUrl}/posts/${post.id}.json`, post);
  }
}
