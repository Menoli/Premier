import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {JwtHelper} from "angular2-jwt";
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../../config";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
 jwtHelper : JwtHelper = new JwtHelper();
 user : string;
 message : string;
  constructor(public navCtrl: NavController,public authProvider : AuthProvider,public httpClient : HttpClient) {
 this.authProvider.authUser.subscribe(jwt =>{
   if(jwt){
     const decoded = this.jwtHelper.decodeToken(jwt);
     this.user = decoded.sub
   }else{
     this.user = null;
   }

 });
  }
ionViewWillEnter(){
    this.httpClient.get(`${SERVER_URL}/secret`,{responseType : 'text'}).subscribe(
      text => this.message = text
    )

  }


  logout(){
    this.authProvider.logout();
  }
}
