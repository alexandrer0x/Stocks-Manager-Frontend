import { MyToastService } from './../../../_services/my-toast.service';
import { AuthService } from '../../../auth/auth.service';
import { UserAuth } from './../userAuth.model';
import { User } from './../user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  userAuth : UserAuth = {
    username: '',
    password: ''
  }

  constructor(private router : Router, private authService : AuthService, private toast: MyToastService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/home'])
    }
  }

  logIn(){
    this.authService.logIn(this.userAuth).subscribe(
      () => {
        if(this.authService.isLoggedIn){
          this.router.navigate(['/home'])
        }else{
          this.toast.toastError([{
            code: 'UnexpectedError',
            description: 'Erro inesperado'
          }])
        }
      },
      error => {
        this.toast.toastError(error)
      })
  }

}
