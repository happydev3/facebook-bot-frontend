import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import {ApiTokenService} from 'app/services/token.service';

import { Contact } from 'app/client/contacts/contact.model';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as Constants from 'app/app.const';
import {ApiAuthService} from 'app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { InConnection } from './inconnection.model';

@Injectable()
export class ContactsService implements Resolve<any>
{
    onContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;
    onContactChanged: BehaviorSubject<any>;
    contacts: Contact[];
    user: any;
    selectedContacts: string[] = [];

    searchText: string;
    filterBy: string;

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
    )
    {
        // Set the defaults
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
        this.onContactChanged = new BehaviorSubject({});
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getContacts(),
                // this.getUserData()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        if(this.searchText == searchText) return;
                        this.searchText = searchText;
                        this.getContacts();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        if (this.filterBy == filter) return;
                        this.filterBy = filter;
                        this.getContacts();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    private jwt(): any {
        const tokenStr = this._token.get();
        if (tokenStr) {
            const headers = new HttpHeaders().set('Authorization', 'Bearer ' + tokenStr);
            return headers;
        } else {
            return '';
        }
    }

    getContactById(id): Promise<any>
    {
        let params = new HttpParams();
        params = params.set('ID2', id);  
        return new Promise((resolve, reject) => {
            this._httpClient.get(Constants.API_URL + '/api/getContactById', {params:params, headers: this.jwt()})
                .subscribe((response: any) => {
                    this.onContactChanged.next(response);
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
    
    updateInConnectionNotes(inConnection): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(Constants.API_URL + '/api/updateInConnectionNotes', inConnection, {headers: this.jwt()})
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
    updateReminder(inConnection): Promise<any>{
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(Constants.API_URL + '/api/updateReminder', inConnection, {headers: this.jwt()})
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
    updateContactLabel(data): Promise<any>{
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(Constants.API_URL + '/api/updateContactLabel', data, {headers: this.jwt()})
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
    getTemplateEmail(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(Constants.API_URL + '/api/getContactTemplateEmail', {headers: this.jwt()})
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

    sendEmailFromTemplate(ID2,selectedTemplateId):Promise<any>
    {
        let params = new HttpParams();
        params = params.set('ID2', ID2);
        params = params.set('template_id', selectedTemplateId);
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(Constants.API_URL + '/api/sendEmailFromTemplate', {params:params, headers: this.jwt()})
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

    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                // this._httpClient.get('api/contacts-contacts')
                this._httpClient.get(Constants.API_URL + '/api/getContactsList', { headers: this.jwt()})
                    .subscribe((response: any) => {

                        this.contacts = [];
                        for(var i in response['contacts_list']){
                            var one_contact = response['contacts_list'][i];
                            one_contact['name'] = one_contact.firstName + ' ' +  one_contact.lastName;
                            this.contacts.push(one_contact);
                        }

                        if ( this.filterBy === 'not_interested' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return _contact.label == 'not_interested';
                            });
                        }

                        if ( this.filterBy === 'spark' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return _contact.label == 'spark';
                            });
                        }

                        if ( this.filterBy === 'heating_up' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return _contact.label == 'heating_up';
                            });
                        }

                        if ( this.filterBy === 'burning_hot' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return _contact.label == 'burning_hot';
                            });
                        }

                        if ( this.filterBy === 'drip' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return _contact.label == 'drip';
                            });
                        }
                        if ( this.filterBy === 'converted' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return _contact.label == 'converted';
                            });
                        }
                        if ( this.filterBy === 'neutral' )
                        {
                            this.contacts = this.contacts.filter(_contact => {
                                return _contact.label == 'neutral';
                            });
                        }                                 
                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                        }
                        this.contacts = this.contacts.map(contact => {
                            return new Contact(contact);
                        });


                        this.onContactsChanged.next(this.contacts);
                        resolve(this.contacts);
                    }, error => {
                        if (error.status == 301) {
                            this._auth.logout();
                        }
                    });
            }
        );
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/contacts-user/5725a6802d10e277a0f35724')
                    .subscribe((response: any) => {
                        this.user = response;
                        this.onUserDataChanged.next(this.user);
                        resolve(this.user);
                    }, reject);
            }
        );
    }

    /**
     * Toggle selected contact by id
     *
     * @param id
     */
    toggleSelectedContact(id): void
    {
        // First, check if we already have that contact as selected...
        if ( this.selectedContacts.length > 0 )
        {
            const index = this.selectedContacts.indexOf(id);

            if ( index !== -1 )
            {
                this.selectedContacts.splice(index, 1);

                // Trigger the next event
                this.onSelectedContactsChanged.next(this.selectedContacts);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedContacts.push(id);

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedContacts.length > 0 )
        {
            this.deselectContacts();
        }
        else
        {
            this.selectContacts();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContacts(filterParameter?, filterValue?): void
    {
        this.selectedContacts = [];

        // If there is no filter, select all contacts
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedContacts = [];
            this.contacts.map(contact => {
                this.selectedContacts.push(contact.ID1);
            });
        }

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(contact): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/contacts-contacts/' + contact.id, {...contact})
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-user/' + this.user.id, {...userData})
                .subscribe(response => {
                    this.getUserData();
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect contacts
     */
    deselectContacts(): void
    {
        this.selectedContacts = [];
        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteContact(contact): void
    {
        const contactIndex = this.contacts.indexOf(contact);
        this.contacts.splice(contactIndex, 1);
        this.onContactsChanged.next(this.contacts);
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedContacts(): void
    {
        for ( const contactId of this.selectedContacts )
        {
            const contact = this.contacts.find(_contact => {
                return _contact.ID1 === contactId;
            });
            const contactIndex = this.contacts.indexOf(contact);
            this.contacts.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
    }
    getContactMessages(id:any,ID1:any): Promise<any>
    {
        let params = new HttpParams();
        params = params.set('id', id);
        params = params.set('ID1', ID1);  
        return new Promise((resolve, reject) => {
            this._httpClient.get(Constants.API_URL + '/api/getContactMessages', {params:params, headers: this.jwt()})
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
    sendContactMessage(data): Promise<any>{
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(Constants.API_URL + '/api/sendContactMessage', data, {headers: this.jwt()})
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
