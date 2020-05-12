import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientEmailTemplateService } from 'app/client/email-templates/email-templates.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'app-email-templates',
    templateUrl  : './email-templates.component.html',
    styleUrls    : ['./email-templates.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EmailTemplatesComponent implements OnInit, OnDestroy
{
    templates: any[];

    // Private
    private _unsubscribeAll: Subject<any>;

   
    constructor(
        private  _router: Router,
        private _clientEmailTemplateService: ClientEmailTemplateService        
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        _clientEmailTemplateService.getClientEmailTemplates().then( res => {
            this.templates = res['client_email_templates'];           
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
        // this.templates = [
        //     {
        //         id: 2,
        //         name: "With Video"
        //     },
        //     {   id: 3,
        //         name: 'Follow up'
        //     }
        // ];   
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
