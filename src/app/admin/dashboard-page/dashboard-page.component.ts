import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostApiService } from 'src/app/shared/api/post-api.service';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[]
  isLoading = false;
  postSubscription$: Subscription;
  deleteSubscription$: Subscription;
  searchPost = ''

  constructor(private postApiService: PostApiService) { }

  ngOnInit() {
    this.postSubscription$ = this.postApiService.getAllPosts().subscribe(post => {
      this.posts = post;
      this.isLoading = true;
    })
  }

  deletePost(id: string) {
    this.deleteSubscription$ = this.postApiService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
    })

  }

  ngOnDestroy() {
    if (this.postSubscription$) {
      this.postSubscription$.unsubscribe()
    }
    if (this.deleteSubscription$) {
      this.deleteSubscription$.unsubscribe()
    }
  }

}
