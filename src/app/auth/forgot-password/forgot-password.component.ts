import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuseConfigService} from '@fuse/services/config.service';
import {ApiAuthService} from 'app/services/auth.service';
import {
    MatSnackBar,
    MatSnackBarConfig,   
  } from '@angular/material';
@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {

    forgotPasswordForm: FormGroup;
    snackConfig:any;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private auth: ApiAuthService,
        public snackBar: MatSnackBar,        
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
        this.snackConfig = new MatSnackBarConfig();
        this.snackConfig.verticalPosition = "top";
        this.snackConfig.horizontalPosition = "center";
        this.snackConfig.duration = 3000;
    }

    onSubmit() {
        this.auth.sendPasswordResetLink(this.forgotPasswordForm.value).subscribe(
            (data:any) => {
                this.handleResponse(data);                    
                this.snackBar.open(data.data, "Success", this.snackConfig);
            }, 
            (error:any) => {
                this.snackBar.open(error.error.data,'Error',this.snackConfig);
            }
        );
    }

    handleResponse (res) {        
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

}
