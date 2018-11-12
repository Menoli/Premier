import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {Storage} from "@ionic/storage";
import {JwtHelper} from "angular2-jwt";
import {SERVER_URL} from "../../config";
import {tap} from "rxjs/operators";
import {Http, Response} from "@angular/http";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public jwtTokenName = 'jwt_Token';
  jwtHelper: JwtHelper = new JwtHelper();
  authUser = new ReplaySubject<any>(1);

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  checkLogin() {
    this.storage.get(this.jwtTokenName).then(jwt => {
      if (jwt && !this.jwtHelper.isTokenExpired(jwt, 1)) {


        this.http.get(`${SERVER_URL}/authentication`)
          .subscribe(() => this.authUser.next(jwt),
            (err) => this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null)));
      }
      else {
        this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
      }
    });

  }


  login(value: any): Observable<any> {
    return this.http.post(`${SERVER_URL}/login`, value, {responseType: 'text'}).pipe(
      tap(jwt => this.handleJwtResponse(jwt))
    )
  }

  private handleJwtResponse(jwt: string) {
    return this.storage.set(this.jwtTokenName, jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }

  signup(value: any): Observable<any> {
    return this.http.post(`${SERVER_URL}/signup`, value, {responseType: 'text'}).pipe(tap(jwt => {
      if (jwt !== 'EXIST') {
        return this.handleJwtResponse(jwt)
      } else {
        return jwt
      }
    }))
  }


  logout() {
    this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null))
  }


}

