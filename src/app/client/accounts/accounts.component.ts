import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'app-accounts',
    templateUrl  : './accounts.component.html',
    styleUrls    : ['./accounts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AccountsComponent implements OnInit, OnDestroy
{
    accounts: any[];

    // Private
    private _unsubscribeAll: Subject<any>;

   
    constructor(
        private  _router: Router,        
    )
    {
        // Set the private defaults
        // this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.accounts = [
            {
                headline: 'Team Member 1',
                name: "12 Conversations",                
            },
            {
                headline: 'Team Member 2',
                name: '395 Connections'
            },
            {
                headline: 'Team Member3',
                name: '4 clients'
            },
            {
                headline: 'Team Member 4',
                name: "123 Conversations",                
            },
            {
                headline: 'Team Member 5',
                name: '295 Connections'
            },
            {
                headline: 'Team Member 6',
                name: '40 clients'
            }
        ];   
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next();
        // this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
  
}
