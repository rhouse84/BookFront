import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
// import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
    user: SocialUser;
    // httpOptions = {
    //     headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': 'this.user.idToken' })
    // };
}
