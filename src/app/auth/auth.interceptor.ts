import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { STORAGE_KEYS } from '../config/storage_keys.config';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router : Router, private authService : AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken()

        if(token != null){
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
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