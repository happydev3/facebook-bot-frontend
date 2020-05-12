import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SmtpService } from './smtp.service';
import { SmtpInformation } from 'app/models/smtp-information';
import {MatSnackBar} from '@angular/material';

@Component({
    selector   : 'app-smtp',
    templateUrl: './smtp.component.html',
    styleUrls  : ['./smtp.component.scss']
})
export class SmtpComponent implements OnInit, OnDestroy
{
    form: FormGroup;
    smtpInformation: SmtpInformation;
  
  

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _smtpService: SmtpService,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.smtpInformation = new SmtpInformation();
        this.createSmtpForm();

        _smtpService.getSmtpInformation().then( res => {
            this.smtpInformation = res['smtp_information'];
            this.createSmtpForm();
        }).catch( err => {

        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Reactive Form
        
    }

    createSmtpForm(): void {

        this.form = this._formBuilder.group({         
            host : [this.smtpInformation.host, Validators.required],
            port  : [this.smtpInformation.port, Validators.required],
            username   : [this.smtpInformation.username, Validators.required],
            password  : [this.smtpInformation.password, Validators.required],         
        });
    }

    addSmtpInformation():void {
        var data = this.form.getRawValue();
        this._smtpService.addSmtpInformation(data).then( res=> {
            this._matSnackBar.open('Smtp Information successfully updated!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        }).catch( err => {
            this._matSnackBar.open('Smtp Information  updated failed!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        });
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
