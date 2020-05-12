import { Component, OnDestroy, OnInit, ChangeDetectionStrategy,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import { ContactsService } from 'app/client/contacts/contacts.service';
import { Templates } from 'app/models/template';
import { templateSourceUrl } from '@angular/compiler';
import { resolve } from 'path';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-contact-detail-dialog',
  templateUrl: './contact-dialog.component.html',
})
export class ContactDialogComponent
{
  templates:Templates[];
  selectedTemplateId:any;
  ID2:any;
    constructor(
      public dialogRef: MatDialogRef<ContactDialogComponent>,
      private _contactsService: ContactsService,
      private _activatedRoute : ActivatedRoute,
      private _router:Router,
      private _matSnackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any
    )
    {   
      this.templates = [];     
      this._contactsService.getTemplateEmail().then( res => {
          this.templates = res['email_templates'];
          // console.log("here dopen dialog erro");      
      }).catch( err => {
        // console.log("here dopen dialog erro", err);
      });

    }    
    ngOnInit() {      
      this.ID2 = this.data['ID2'];     
    }
    sendEmailFromTemplate(){
      this._contactsService.sendEmailFromTemplate(this.ID2,this.selectedTemplateId).then(res =>{
        this._matSnackBar.open('Email sent successfully!', 'OK', {
          verticalPosition: 'top',
          duration        : 3500
        });       
      }).catch(err =>{

      });
      this.dialogRef.close();
      this.dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');          
      });
      
    }
}