import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    form: FormGroup;
    user: User;
    message: string;

    constructor(public auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            // tslint:disable-next-line:no-string-literal
            if (params['isLogOut']) {
                this.message = 'Пожалуйста, авторизуйтесь';
            }
        });
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

        this.auth.login(this.user).subscribe(() => {
            this.form.reset();
            this.router.navigate(['/admin', 'dashboard']);
        });
    }
}
