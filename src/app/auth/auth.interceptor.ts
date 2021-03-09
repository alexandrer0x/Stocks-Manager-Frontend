import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router : Router, private authService : AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.isLoggedIn()){
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
            })
            return next.handle(cloneReq).pipe(
                tap(
                    succ => {},
                    err => {
                        if(err.status == 401) {
                            this.router.navigateByUrl('user/login')
                        }
                    }
                )
            )
        } else {
            return next.handle(req.clone())
        }
    }
}