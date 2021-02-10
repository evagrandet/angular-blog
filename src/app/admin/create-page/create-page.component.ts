import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostApiService } from 'src/app/shared/api/post-api.service';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
    form: FormGroup;
    post: Post
    constructor(private postApiService: PostApiService) { }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, Validators.required),
            text: new FormControl(null, Validators.required),
            author: new FormControl(null, Validators.required),
        });
    }

    submit() {
        if (this.form.disabled) {
            return;
        }

        this.post = {
            title: this.form.value.title,
            text: this.form.value.text,
            author: this.form.value.author,
            date: new Date()
        }

        this.postApiService.createPost(this.post).subscribe(() => {
            this.form.reset();
        })
    }
}
