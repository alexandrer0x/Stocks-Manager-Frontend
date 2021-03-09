import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  appTitle : string = environment.applicationTitle
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  logOut(): void{
    this.authService.logOut()
    this.router.navigate(['/user/login'])
    console.log('logout')
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn()
  }

  navigateToLogIn() : void {
    this.router.navigate(['/user/login'])
  }

  navigateToRegister() : void {
    this.router.navigate(['/user/register'])
  }
}
