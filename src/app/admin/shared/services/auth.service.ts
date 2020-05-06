import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from 'src/app/shared/interfaces/user';
import { environment } from 'src/environments/environment';
import { FirebaseAuthResponse } from 'src/app/shared/interfaces/firebase-auth-response';
@Injectable()
export class AuthService {
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
            .pipe(tap(this.setToken));
    }
    logout() {
        this.setToken(null);
    }

    isAuthenticated(): boolean {
        return !!this.token;
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
