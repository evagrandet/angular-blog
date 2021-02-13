import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { User } from 'src/app/shared/interfaces/user';
import { environment } from 'src/environments/environment';
import { FirebaseAuthResponse } from 'src/app/shared/interfaces/firebase-auth-response';
@Injectable({providedIn: 'root'})
export class AuthService {
    public error$ = new Subject<string>();

    constructor(private http: HttpClient) {}

    get token(): string {
        const expDate = new Date(localStorage.getItem('firebase-token-exp'));
        if (new Date() > expDate) {
            this.logout();
            return null;
        }
        return localStorage.getItem('firebase-token');
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
                user,
            )
            .pipe(tap(this.setToken), catchError(this.handleErrors.bind(this)));
    }
    logout() {
        this.setToken(null);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    private handleErrors(error: HttpErrorResponse) {
        const { message } = error.error.error;
        switch (message) {
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Email не найден');
                break;
        }
        return throwError(error);
    }

    private setToken(response: FirebaseAuthResponse | null) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('firebase-token', response.idToken);
            localStorage.setItem('firebase-token-exp', expDate.toString());
        } else {
            localStorage.clear();
        }
    }
}
