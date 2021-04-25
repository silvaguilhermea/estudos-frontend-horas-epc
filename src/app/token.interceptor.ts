import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const tokenString_old = localStorage.getItem('access_token');
    const tokenString_old_1 = localStorage.getItem('access_token');
    console.log("Ver" + tokenString_old_1)
    const tokenString = tokenString_old?.replace("Bearer ", "");
    console.log("tokenString: " + tokenString)
    //const tokenString = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3aWxsaWFtLmdvbmNhbHZlc0BidXRhbnRhbi5nb3YuYnIiLCJleHAiOjE2MTkwNTYzMjF9.qgywAGvd2rMmRRMxvsC_kLXF9hYgGYIcNnfT_RYdrMLp8jmiCfmscmg9PZhaNciz0tpz2oW3Rw9qKty3XKHklQ';
    const url = request.url;

    if( tokenString && !url.endsWith('/login') ){
      console.log("Possui tokenString e url não termina com /login");
      const token = JSON.parse(tokenString);
      console.log("token: " + token)
      const jwt = token;
      console.log("jwt: " + jwt)
      console.log("Request antes: " + request);
      request = request.clone({
        setHeaders : {
          Authorization: jwt
        }
      })
      console.log("Request depois: " + request);
    }

    return next.handle(request);
  }
}
