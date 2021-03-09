import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

interface ResultError{
  code: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class MyToastService {

  constructor(private toastr: ToastrService) { }

  toastError(error){
    if(error.error && error.error instanceof Array){
      error.error.forEach(element => {
        if(element.code){
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error(element.description)
              break;
    
            case 'InvalidCredentials':
              this.toastr.error(element.description)
              break;
    
            case 'UnexpectedError':
              this.toastr.error(element.description)
              break;
    
            default:
              this.toastr.error(`Descrição: ${element.description}`, `Erro: ${element.code}`)
              break;
          }
        } else {
          this.toastr.error('Erro inesperado')
        }
      });
    } else if(error.message){
      this.toastr.error(error.message)
    } else {
      this.toastr.error('Erro inesperado')
    }   
  }
}
