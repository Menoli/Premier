import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {IonicStorageModule, Storage} from "@ionic/storage";
import {AuthHttp,AuthConfig} from "angular2-jwt";
import {Http, HttpModule} from "@angular/http";
import { AuthProvider } from '../providers/auth/auth';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CustomFormsModule} from "ng2-validation";
import {SignupPage} from "../pages/signup/signup";
import {LoginPage} from "../pages/login/login";

let storage = new Storage({});
export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'JWT',
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('jwt_token').then((token: string) => token)),
  }), http);
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CustomFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide:ErrorHandler,useClass:IonicErrorHandler},
    {provide: AuthHttp,useFactory : getAuthHttp,deps:[Http]},
    AuthProvider,

  ]
})
export class AppModule {}
