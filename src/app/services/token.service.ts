import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Subject} from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ApiTokenService {

    user?: User = null;
    private syncUserSubject = new Subject<any>();
    constructor() {
    }

    public handle(data) {
        this.set(data['token']);
        this.setUser(data['user']);
    }

    private set(token): void{
        localStorage.setItem('token', token);
    }

    public get(): any{
        return localStorage.getItem('token');
    }

    public setUser(user): void{
        localStorage.setItem('user', JSON.stringify(user));
        this.syncUserSubject.next(user);
    }

    public getUser(): any{
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'));
        } else {
            return null;
        }

    }

    syncUser(): any{
        return this.syncUserSubject.asObservable();
    }

    public remove(): void{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    private isValid(): any{
        const token = this.get();
        if (this.get() != null) {
            const payload = this.payload(token);
            if (payload) {
                return true;
            }
        }
    }

    private payload(token) {
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    private decode(payload) {
        return JSON.parse(atob(payload));
    }

    public loggedIn() {
        return this.isValid();
    }

}
