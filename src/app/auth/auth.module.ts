import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule,MatSnackBarModule,
    MatIconModule, MatInputModule, MatRadioModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'forgot-password',
      component:ForgotPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
    }
];

@NgModule({
    declarations: [LoginComponent, ResetPasswordComponent, ForgotPasswordComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSnackBarModule,

        FuseSharedModule,

        FormsModule,
        ReactiveFormsModule
    ],
    providers:[
        
    ]
})
export class AuthModule {
}
