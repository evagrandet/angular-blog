import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostApiService } from '../shared/api/post-api.service';
import { Post } from '../shared/interfaces/post';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts$: Observable<Post[]>
  constructor(private postApiService: PostApiService) { }

  ngOnInit() {
    this.posts$ = this.postApiService.getAllPosts();
  }

}
