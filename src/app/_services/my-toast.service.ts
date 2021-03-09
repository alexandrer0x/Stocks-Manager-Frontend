import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { MyError } from '../models/my-error.model';

interface ResultError{
  code: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class MyToastService {

  constructor(private toastr: ToastrService) { }

  toastError(error : MyError){
    if(error && error.code && error.message) {
      this.toastr.error(`Erro ${error.code}`, error.message, {timeOut: 10000})
        
    }
    else {
      this.toastr.error('Erro inesperado')
    }
  }
}
