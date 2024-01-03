import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    let isLogged = false;
    if (localStorage.getItem('customer_token')) {
      isLogged = true;
    } else {
      isLogged = false;
    }
    return isLogged;
  }
}
