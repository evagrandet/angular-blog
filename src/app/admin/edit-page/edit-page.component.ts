import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostApiService } from 'src/app/shared/api/post-api.service';
import { Post } from 'src/app/shared/interfaces/post';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: Post;
  isSubmitted = false;

  updateSubscibtion$: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private postApiService: PostApiService, private alertService: AlertService) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.postApiService.getPostById(params['id'])
    })).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.updateSubscibtion$ = this.postApiService.updatePost({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    }).subscribe(() => {
      this.isSubmitted = false;
      this.router.navigate(['/admin', 'dashboard']);
      this.alertService.throwAlert({ type: 'success', text: 'Пост успешно отредактирован' });
    }
    )
  }

  ngOnDestroy(): void {
    if (this.updateSubscibtion$) {
      this.updateSubscibtion$.unsubscribe();
    }

  }

}
