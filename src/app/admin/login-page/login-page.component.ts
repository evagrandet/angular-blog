import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    form: FormGroup;
    user: User;

    constructor() {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }
        this.user = this.form.value;
    }
}
