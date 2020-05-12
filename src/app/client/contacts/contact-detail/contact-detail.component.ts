import { Component, OnDestroy, OnInit, ChangeDetectionStrategy,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { ContactsService } from 'app/client/contacts/contacts.service';
import { Observable, Subject } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { Contact } from 'app/client/contacts/contact.model';
import { InConnection } from 'app/client/contacts/inconnection.model';
import {MatSnackBar} from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ContactDialogComponent } from 'app/client/contacts/contact-detail/email-dialog/contact-dialog.component';

export interface DialogData {
    animal: string;
    name: string;
  }

@Component({
    selector   : 'app-contact-detail',
    templateUrl: './contact-detail.component.html',
    styleUrls  : ['./contact-detail.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailComponent implements OnInit, OnDestroy
{
    
  
  
    contact:Contact;
    inConnection: InConnection;
    contactId:any;
    dataSource: FilesDataSource | null;
    checkboxes: {};
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
     
    constructor(
        private _formBuilder: FormBuilder,
        private _contactsService: ContactsService,
        private _activatedRoute : ActivatedRoute,
        private _router:Router,
        private _matSnackBar: MatSnackBar,
        public dialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.contact = new Contact('');
        this.inConnection = new InConnection('');
        this._activatedRoute.params.subscribe(params => {
            if (params['ID2']) {
                this.contactId = params['ID2'];               
                 this._contactsService.getContactById(this.contactId).then( res => {
                    this.contact = res['in_contact'];
                    this.inConnection = res['in_connection'];                                  
                    }).catch( err => {
                });    
            }})        
        
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------


    // -----------------------------------------------------------------------------------------------------
    // Add the contacts Not to DataBase
    // -----------------------------------------------------------------------------------------------------
    updateInConnectionNotes():void{
        var data = this.inConnection;        
        this._contactsService.updateInConnectionNotes(data).then( res=> {
            this._matSnackBar.open('Notes successfully updated!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
            this._router.navigate(['/client/contacts/']);

        }).catch( err => {
            this._matSnackBar.open('Notes update failed!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        });
    }
    remiderChange(event: any) {
        this._contactsService.updateReminder(this.inConnection).then( res=> {
            this._matSnackBar.open('Reminder successfully updated!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
            // this._router.navigate(['/client/contacts/']);

        }).catch( err => {
            this._matSnackBar.open('Reminder update failed!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        });
    }
    selectChangeLabel(event: any){
        var data = this.inConnection;        
        this._contactsService.updateContactLabel(data).then( res=> {
            this._matSnackBar.open('Label successfully updated!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        }).catch( err => {
            this._matSnackBar.open('Label update failed!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(ContactDialogComponent, {
          width: '500px',
          data: {
            ID2: this.contactId
          }         
        });    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');          
        });
      }
    /**
     * On init
     */
    ngOnInit(): void
    {
        
        // this._activatedRoute.params.subscribe(params => {
        //     if (params['id']) {
        //         this.contactId = params['id'];               
        //          this._contactsService.getContactListById(this.contactId).then( res => {
        //             this.contacts = res['contactsListById'];
        //             console.log([Contact])                  
        //         }).catch( err => {

        //         });    
        //     }

        // })        
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

    // -----------------------------------------------------------------------------------------------------
   
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(
        private _contactsService: ContactsService
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
