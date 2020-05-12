import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';

import {ApiAuthService} from 'app/services/auth.service';
import {ApiTokenService} from 'app/services/token.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
// import { adminNavigation, managerNavigation, clientNavigation } from 'app/navigation/navigation';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMsg = null;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _formBuilder: FormBuilder,
        public router: Router,
        public auth: ApiAuthService,
        public token: ApiTokenService
    ) {
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
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        this.loginForm.valueChanges.subscribe( (data) => {
            this.errorMsg = null;
        });
    }

    onSubmit() {
        this.auth.authenticate(this.loginForm.value).subscribe(
            data => this.handleResponse(data),
            error => {console.log(error)
                this.errorMsg = error.error['error'];
            });
    }
    handleResponse(data) {
      
        if (data['user'].roleNames.includes('client')) {
            this.token.handle(data);
            this.auth.changeAuthStatus(true);
            this.router.navigate(['/client']);
        } else {
            this.errorMsg = "You have no right to access!";            
        }
        
    }

}
