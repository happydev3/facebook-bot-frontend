import {Injectable} from '@angular/core';
import {ApiTokenService} from '../services/token.service';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


@Injectable()
export class RolesGuardService {

  roles: any[] = [];

  constructor(private tokenApi: ApiTokenService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.tokenApi.getUser();
    if (user) {
        this.roles = user['roleNames'];
    }
    const checkroles = route.data['roles'];

    if (this.roles.indexOf('admin') !== -1) {
      return true; // admin can access all router
    } else if (checkroles) {
        const checkRole = checkroles.some((role) => {
            return this.roles.indexOf(role) !== -1;
        });
        if (checkRole) {
          return true;
        }
        else {
          if (this.roles.indexOf('manager') !== -1) {
            this.router.navigate(['/manager']);
          } else {
            // this.router.navigate(['/client']);
          }
          return false;
        }

    }
      this.router.navigate(['/auth/login']);
      return false;
  }
}
