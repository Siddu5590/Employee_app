import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import { take } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor( private store: Store<fromRoot.State>) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // if (this.authService.isAuth()) {
        //     return true;
        // } else {
        //     return this.router.navigate(['/login']);
        // }
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

    canLoad(route: Route) {
        // if (this.authService.isAuth()) {
        //     return true;
        // } else {
        //     return this.router.navigate(['/login']);
        // }

        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}