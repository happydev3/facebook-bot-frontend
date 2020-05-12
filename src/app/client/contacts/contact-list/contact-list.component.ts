import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { ContactsService } from 'app/client/contacts/contacts.service';
import {MatSort} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';


@Component({
    selector     : 'contacts-contact-list',
    templateUrl  : './contact-list.component.html',
    styleUrls    : ['./contact-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ContactsContactListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    @ViewChild(MatSort) sort: MatSort;   
    contacts: any;
    user: any;
    dataSource: MatTableDataSource<any> | null;
    displayedColumns = ['picture', 'name', 'email', 'phone', 'title','company','reminder'];
    selectedContacts: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    
    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _contactsService: ContactsService,
        public _matDialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit(): void
    {
        
        this._contactsService.onContactsChanged.subscribe(res=>{
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
            // this.dataSource.paginator = this.paginator;
            // setTimeout(() => this.dataSource.paginator = this.paginator,100);
        });

        this._contactsService.onContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contacts => {
                this.contacts = contacts;

                this.checkboxes = {};
                contacts.map(contact => {
                    this.checkboxes[contact.id] = false;
                });
            });

        // this._contactsService.onSelectedContactsChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(selectedContacts => {
        //         for ( const id in this.checkboxes )
        //         {
        //             if ( !this.checkboxes.hasOwnProperty(id) )
        //             {
        //                 continue;
        //             }

        //             this.checkboxes[id] = selectedContacts.includes(id);
        //         }
        //         this.selectedContacts = selectedContacts;
        //     });

        // this._contactsService.onUserDataChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(user => {
        //         this.user = user;
        //     });

        // this._contactsService.onFilterChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(() => {
        //         this._contactsService.deselectContacts();
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    
    onSelectedChange(contactId): void
    {
        // this._contactsService.toggleSelectedContact(contactId);
    }

    /**
     * Toggle star
     *
     * @param contactId
     */
    toggleStar(contactId): void
    {
        // if ( this.user.starred.includes(contactId) )
        // {
        //     this.user.starred.splice(this.user.starred.indexOf(contactId), 1);
        // }
        // else
        // {
        //     this.user.starred.push(contactId);
        // }

        // this._contactsService.updateUserData(this.user);
    }
    
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(
        private _contactsService: ContactsService,
        private _sort: MatSort
    )
    {
        super();                
        
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._contactsService.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
