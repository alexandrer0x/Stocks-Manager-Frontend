import { AuthService } from '../../auth/auth.service';
import { User } from './../../components/user/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user : User

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    const _user = this.authService.getUser()
    
    if(_user) { this.user = _user }
    else {  }
  }

}
