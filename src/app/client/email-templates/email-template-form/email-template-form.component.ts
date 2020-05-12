import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { ClientEmailTemplateService } from '../email-templates.service';
import { ClientEmailTemplate } from 'app/models/client-email-template';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector   : 'app-email-template-form',
    templateUrl: './email-template-form.component.html',
    styleUrls  : ['./email-template-form.component.scss']
})
export class EmailTemplateFormComponent implements OnInit, OnDestroy
{
    form: FormGroup;
    clientEmailTemplate: ClientEmailTemplate;
    clientEmailTemplateId: any;

  

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _clientEmailTemplatesService: ClientEmailTemplateService,
        private _matSnackBar: MatSnackBar,
        private _activatedRoute : ActivatedRoute,
        private _router: Router
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.clientEmailTemplate = new ClientEmailTemplate(); 
        this.createClientEmailTemplateForm();
        this._activatedRoute.params.subscribe(params => {
            if (params['id']) {
                this.clientEmailTemplateId = params['id'];               
                 _clientEmailTemplatesService.getClientEmailTemplateById(this.clientEmailTemplateId).then( res => {
                    this.clientEmailTemplate = res['client_email_template'];
                    this.createClientEmailTemplateForm();
                }).catch( err => {

                });    
            }
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
        // this.form = this._formBuilder.group({         
        //     subTitle : ['', Validators.required],
        //     subject  : ['', Validators.required],
        //     body   : ['', Validators.required],                     
        // });        
    }
    createClientEmailTemplateForm(): void {

        this.form = this._formBuilder.group({
            id: [this.clientEmailTemplate.id],         
            sub_title : [this.clientEmailTemplate.sub_title, Validators.required],
            client_subject  : [this.clientEmailTemplate.client_subject, Validators.required],
            client_body  : [this.clientEmailTemplate.client_body, Validators.required]
        });
    }
    addClientEmailTemplate():void {
        if(this.clientEmailTemplateId){
            this.updateClientEmailTemplate();
            return;
        }
        var data = this.form.getRawValue();
        this._clientEmailTemplatesService.addClientEmailTemplate(data).then( res=> {
            this._matSnackBar.open('Email Template successfully added!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
            this._router.navigate(['/client/email-templates/']);

        }).catch( err => {
            this._matSnackBar.open('Email Template add failed!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        });
    }

    updateClientEmailTemplate():void{
        var data = this.form.getRawValue();
        this._clientEmailTemplatesService.updateClientEmailTemplate(data).then( res=> {
            this._matSnackBar.open('Email Template successfully updated!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
            this._router.navigate(['/client/email-templates/']);

        }).catch( err => {
            this._matSnackBar.open('Email Template update failed!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        });
    }
    deleteClientEmailTemplate():void {       
        
        this._clientEmailTemplatesService.deleteClientEmailTemplate(this.clientEmailTemplateId).then( res=> {
            this._matSnackBar.open('Email Template successfully deleted!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
            this._router.navigate(['/client/email-templates/']);

        }).catch( err => {
            this._matSnackBar.open('Email Template delete failed!', 'OK', {
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
