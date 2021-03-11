import { MyToastService } from './../../../_services/my-toast.service';
import { Router } from '@angular/router';
import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Roles : any = ['Admin', 'User']
  registerForm: FormGroup

  user : User = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  } /* = {
    email: 'alexandrer0x@hotmail.com',
    password: 'alex',
    firstName: 'Alexandre',
    lastName: 'Vieira'
  } */

  constructor(private formBuilder : FormBuilder, private authService: AuthService, private router : Router, private myToast : MyToastService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/home'])
    }else{
      this.validate()
    }
  }

  register() : void {
    if(this.registerForm.valid) {
      //this.user = Object.assign({}, this.registerForm.value)
      this.authService.register(this.user).subscribe(
        (user : User)=>{
          this.router.navigate(['/home'])
        },
        error => {
          this.myToast.toastError(error)
        })
    }
  }
  

  validate() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }
}
