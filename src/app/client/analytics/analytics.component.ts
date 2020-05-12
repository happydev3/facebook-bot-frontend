import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'app-analytics',
    templateUrl  : './analytics.component.html',
    styleUrls    : ['./analytics.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AnalyticsComponent implements OnInit, OnDestroy
{
    analytics: any[];

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
        this.analytics = [
            {
                headline: 'CXO campaign',
                name: "1200 Connections",                
            },
            {
                headline: 'Recruiting',
                name: '400 Connections'
            },
            {
                headline: 'Tech Owners',
                name: '2 Converts'
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
