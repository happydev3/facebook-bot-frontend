import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
    MatProgressBarModule, MatRippleModule, MatSidenavModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseMaterialColorPickerModule } from '@fuse/components';
import { EmailTemplatesComponent } from 'app/client/email-templates/email-templates.component';
import { EmailTemplateFormComponent } from  'app/client/email-templates/email-template-form/email-template-form.component';
import { ClientEmailTemplateService } from 'app/client/email-templates/email-templates.service';
const routes: Routes = [
    {
        path     : '',
        component: EmailTemplatesComponent,       
    },
    {
        path     : 'new',
        component: EmailTemplateFormComponent,        
    },
    {
        path: ':id/detail',
        component:EmailTemplateFormComponent
    }
];

@NgModule({
    declarations   : [
       EmailTemplatesComponent,
       EmailTemplateFormComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule,

        NgxDnDModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseMaterialColorPickerModule
    ],
    providers      : [
        ClientEmailTemplateService
    ],   
})
export class EmailTemplatesModule
{
}
