import { AuthResponse } from '../components/user/authResponse.model';
import { environment } from '../../environments/environment';
import { User } from '../components/user/user.model';
import { Observable} from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { UserAuth } from '../components/user/userAuth.model';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { StorageService } from '../_services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl : string = environment.baseUrl + 'users'
    jwtHelper = new JwtHelperService()
    decoededToken : any

    constructor(private http : HttpClient, private storage : StorageService) { }

    

    logIn(userAuth : UserAuth) : Observable<UserAuth> {
        return this.http.post<UserAuth>(`http://localhost:8080/login`, userAuth, {observe: 'response'})
            .pipe(mergeMap((response1) : Observable<UserAuth> => {
                let header = response1.headers.get('authorization')
                let email : any

                if(header != null) {
                    const token = header.substr(7)
                    email = userAuth.email

                    this.storage.setItem(STORAGE_KEYS.token, token)
                    this.storage.setItem(STORAGE_KEYS.email, email)

                    let params = new HttpParams().set('email', email)
                
                    return this.http.get<UserAuth>(`${this.baseUrl}/email`, {params}).pipe(
                        map((response2 : any) : UserAuth => {
                            let user : User = response2
                            this.storage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
                            return user
                        })
                    )
                }                
            }))
    }

    register(user : User) : Observable<User> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/register`, user).pipe(
            map((response: AuthResponse) => {
                let user : User = response.user
                const token : string = response.token

                if(user) {
                    this.storage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
                    this.storage.setItem(STORAGE_KEYS.token, token)
                    this.decoededToken = this.jwtHelper.decodeToken(token)
                    console.log(this.decoededToken)
                }
                
                console.log(response)
                return response.user
            })
        )
    }

    logOut() : void {
        this.storage.removeItem(STORAGE_KEYS.token)
        this.storage.removeItem(STORAGE_KEYS.user)
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
        const user = this.storage.getItem(STORAGE_KEYS.user)

        if(user) { return JSON.parse(this.storage.getItem(STORAGE_KEYS.user)) }
        else { return null } 
    }

    getToken() : string {
        return this.storage.getItem(STORAGE_KEYS.token)
    }
}