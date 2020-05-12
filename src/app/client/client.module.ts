import { NgModule } from '@angular/core';
import { SmtpModule } from 'app/client/smtp/smtp.module';
import { EmailTemplatesModule } from 'app/client/email-templates/email-templates.module';
import { AnalyticsModule } from 'app/client/analytics/analytics.module';
import { RouterModule,Routes } from '@angular/router';
import { ContactsService } from 'app/client/contacts/contacts.service';
import { AuthGuard } from 'app/guard/auth.guard'; 
import {MatSnackBarModule} from '@angular/material';
const routes: Routes = [
    {
        path        : 'analytics',
        loadChildren: './analytics/analytics.module#AnalyticsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'smtp',
        loadChildren: 'app/client/smtp/smtp.module#SmtpModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'email-templates',
        loadChildren: 'app/client/email-templates/email-templates.module#EmailTemplatesModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'downloads',
        loadChildren: 'app/client/downloads/downloads.module#DownloadsModule',
        canActivate: [AuthGuard]
    }, 
    {
        path: 'accounts',
        loadChildren: 'app/client/accounts/accounts.module#AccountsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'contacts',
        loadChildren: 'app/client/contacts/contacts.module#ContactsModule',
        canActivate: [AuthGuard],
        resolve  : {
            contacts: ContactsService
        }
    },  
    {
        path      : '**',
        redirectTo: 'analytics',
        canActivate: [AuthGuard]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        MatSnackBarModule
    ],
    providers: [
        ContactsService,
        AuthGuard
    ]
})
export class ClientModule
{

}
