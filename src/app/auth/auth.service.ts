import { AuthResponse } from '../components/user/authResponse.model';
import { environment } from '../../environments/environment';
import { User } from '../components/user/user.model';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { UserAuth } from '../components/user/userAuth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl : string = environment.baseUrl + 'user'
    jwtHelper = new JwtHelperService()
    decoededToken : any

    constructor(private http : HttpClient) { }

    logIn(userAuth : UserAuth)  {
        return this.http.post<UserAuth>(`${this.baseUrl}/login`, userAuth).pipe(
            map((response: any) => {
                let user : User = response.user
                const token : string = response.token
                if(user) {
                    localStorage.setItem('user', JSON.stringify(user))
                    localStorage.setItem('token', token)
                    this.decoededToken = this.jwtHelper.decodeToken(token)
                    console.log(this.decoededToken)
                }
            })
        )
    }

    register(user : User) : Observable<User> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/register`, user).pipe(
            map((response: AuthResponse) => {
                let user : User = response.user
                const token : string = response.token

                if(user) {
                    localStorage.setItem('user', JSON.stringify(user))
                    localStorage.setItem('token', token)
                    this.decoededToken = this.jwtHelper.decodeToken(token)
                    console.log(this.decoededToken)
                }
                
                console.log(response)
                return response.user
            })
        )
    }

    logOut() : void {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    isLoggedIn() : boolean {
        const token = this.getToken()
        const user = this.getUser();
        const isExpired = this.jwtHelper.isTokenExpired(token);

        if(token && user) { 
            if(isExpired){
                this.logOut()
            }
            return !isExpired
         }
        else { return false }
    }

    getUser() : User {
        const user = localStorage.getItem('user')

        if(user) { return JSON.parse(localStorage.getItem('user')) }
        else { return null } 
    }

    getToken() : string {
        return localStorage.getItem('token')
    }
}