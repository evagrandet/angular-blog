import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
    form: FormGroup;

    constructor() {}

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
    }
}
