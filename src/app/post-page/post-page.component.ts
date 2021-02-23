import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostApiService } from '../shared/api/post-api.service';
import { Post } from '../shared/interfaces/post';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>

  constructor(private route: ActivatedRoute, private postApiService: PostApiService) { }

  ngOnInit() {
    this.post$ = this.route.params.pipe(switchMap((params:Params) => {
      return this.postApiService.getPostById(params['id'])
    }))
  }

}
