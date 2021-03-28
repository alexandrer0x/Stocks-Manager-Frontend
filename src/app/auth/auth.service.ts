import { environment } from '../../environments/environment';
import { User } from '../components/user/user.model';
import { Observable} from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { LoginCreds } from '../components/user/loginCreds.model';
import { PARAM_KEYS, STORAGE_KEYS } from '../config/string_keys.config';
import { StorageService } from '../_services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl : string = environment.apiUrl + 'users'
    jwtHelper = new JwtHelperService()
    decoededToken : any

    constructor(private http : HttpClient, private storage : StorageService) { }

    

    logIn(loginCreds : LoginCreds) : Observable<LoginCreds> {
        return this.http.post<LoginCreds>(`http://localhost:8080/login`, loginCreds, {observe: 'response'}).pipe(
            mergeMap((response1) : Observable<LoginCreds> => {
                let header = response1.headers.get('authorization')
                let email : string

                if(header != null) {
                    const token = header.substr(7)
                    email = loginCreds.email

                    this.storage.setItem(STORAGE_KEYS.token, token)
                    this.storage.setItem(STORAGE_KEYS.email, email)

                    let params = new HttpParams().set(PARAM_KEYS.user, email)
                
                    return this.http.get<LoginCreds>(`${this.baseUrl}/email`, {params}).pipe(
                        map((response2 : any) : LoginCreds => {
                            let user : User = response2
                            this.storage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
                            return user
                        })
                    )
                }                
            }))
    }

    register(inputUser : User) : Observable<LoginCreds> {
        return this.http.post<User>(`${this.baseUrl}`, inputUser).pipe(
            mergeMap((response: User) => {
                let user : User = response

                if(user) {
                    this.storage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
                    //this.storage.setItem(STORAGE_KEYS.token, token)
                    //this.decoededToken = this.jwtHelper.decodeToken(token)
                }
                
                let loginCreds : LoginCreds = {
                    email: user.email,
                    password: inputUser.password
                }
                return this.logIn(loginCreds)
            }))

            
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