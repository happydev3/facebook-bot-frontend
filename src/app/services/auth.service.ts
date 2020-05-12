import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiTokenService} from './token.service';
import * as Constants from '../app.const';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ApiAuthService {

    private loggedIn = new BehaviorSubject < boolean > (this.token.loggedIn());

    authStatus = this.loggedIn.asObservable();
    changeAuthStatus(value: boolean) {
        this.loggedIn.next(value);
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private http: HttpClient,
        private token: ApiTokenService,
        public router: Router) {
    }

    public authenticate(user: User) {
        return this.http
            .post(Constants.API_URL + '/api/login', user, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
    public logout() {
        this.token.remove();
        this.changeAuthStatus(false);
        this.router.navigate(['/auth/login']);
    }
    public register(user: User) {
        return this.http
            .post(Constants.API_URL + '/api/user/register', user, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
    public sendPasswordResetLink(data) {
        return this.http
            .post(Constants.API_URL + '/api/sendPasswordResetLink', data, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
    public changePassword(user) {
        return this.http
            .post(Constants.API_URL + '/api/changePassword', user, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
    private jwt() {
        if (this.token.get()) {
            const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
            return {headers: headers};
        }
    }
}
