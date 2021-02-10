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
}
