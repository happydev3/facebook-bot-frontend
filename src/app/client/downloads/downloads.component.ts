import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'app-downloads',
    templateUrl  : './downloads.component.html',
    styleUrls    : ['./downloads.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DownloadsComponent implements OnInit, OnDestroy
{
    downloads: any[];

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
        this.downloads = [
            {
                headline: 'CXO campaigns',
                name: "Download CSV",                
            },
            {
                headline: 'Recruiters',
                name: 'Download CSV'
            },
            {
                headline: 'Boulder Campaign',
                name: 'Download CSV'
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
