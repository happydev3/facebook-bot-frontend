import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FuseUtils} from '@fuse/utils';
import {User} from 'app/models/user';
import {map} from 'rxjs/operators';
import {ApiTokenService} from 'app/services/token.service';
import * as Constants from 'app/app.const';
import {MatSnackBar} from '@angular/material';
import {ApiAuthService} from 'app/services/auth.service';

@Injectable()
export class SmtpService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */

    constructor(
        private _httpClient: HttpClient,
        private _token: ApiTokenService,
        private _auth: ApiAuthService,
        private _matSnackBar: MatSnackBar
    ) {

    }

    private jwt(): any {
        const tokenStr = this._token.get();
        if (tokenStr) {
            const headers = new HttpHeaders().set('Authorization', 'Bearer ' + tokenStr);
            return headers;
        } else {
            return '';
        }
    }

    /**
     * Get email templates
     *
     * @returns {Promise<any>}
     */

    getSmtpInformation(): Promise<any> {       

        return new Promise((resolve, reject) => {
                this._httpClient.get(Constants.API_URL + '/api/getSmtpInformation', {  headers: this.jwt()})
                    .subscribe((response: any) => {
                        resolve(response);
                    },
                    error => {
                        if (error.status == 301) {
                            this._auth.logout();
                        }
                    });
            }
        );
    }
    

    addSmtpInformation(smtpInformation): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(Constants.API_URL + '/api/addSmtpInformation', smtpInformation, {headers: this.jwt()})
                .subscribe(
                    response => {
                        resolve(response);
                    },
                    error => {
                        if (error.status == 301) {
                            this._auth.logout();
                        }
                        this._matSnackBar.open('Error, ' + error.error['message'], 'OK', {
                            verticalPosition: 'top',
                            duration        : 3500
                        });
                    }
                );
        });
    }
    

}
