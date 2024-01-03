import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotAuth implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    let isLogged = true;
    if (localStorage.getItem('customer_token')) {
      isLogged = false;
    } else {
      isLogged = true;
    }
    return isLogged;
  }
}
