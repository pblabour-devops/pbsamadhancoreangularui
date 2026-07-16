import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EstablishmentService { 

  public validateInput(e: any, ) {

    let input;
  if (e.metaKey || e.ctrlKey) {
    return true;
  }
  if (e.which === 32) {
   return false;
  }
  if (e.which === 0) {
   return true;
  }
  if (e.which < 33) {
    return true;
  }
  input = String.fromCharCode(e.which);
  return !!/[\d\s]/.test(input);
  }
}
