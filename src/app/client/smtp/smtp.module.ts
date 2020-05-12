import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { SmtpComponent } from 'app/client/smtp/smtp.component';
import { SmtpService } from './smtp.service';

const routes: Routes = [
    {
        path     : '',
        component: SmtpComponent
    }
];

@NgModule({
    declarations: [
        SmtpComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,

        FuseSharedModule,
    ],
    providers:[
        SmtpService
    ]
})
export class SmtpModule
{
}
