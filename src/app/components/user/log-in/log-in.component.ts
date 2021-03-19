import { MyToastService } from './../../../_services/my-toast.service';
import { AuthService } from '../../../auth/auth.service';
import { LoginCreds } from '../loginCreds.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginCreds : LoginCreds = {
    email: '',
    password: ''
  }

  constructor(private router : Router, private authService : AuthService, private toast: MyToastService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/home'])
    }
  }

  logIn(){
    this.authService.logIn(this.loginCreds).subscribe(
      () => {
        if(this.authService.isLoggedIn){
          this.router.navigate(['/home'])
        }else{
          this.toast.toastError({
            code: '403-1',
            message: 'Credenciais inválidas.'
          })
        }
      },
      error => {
        if(error != null && error.status == 403) {
          this.toast.toastError({
            code: '403-1',
            message: 'Credenciais inválidas.'
          })
        }else {
          this.toast.toastError({
            code: '500-1',
            message: 'Sistema indisponível no momento.'
          })
        }
        
      })
  }

}
