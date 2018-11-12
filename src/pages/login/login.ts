import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {AuthProvider} from "../../providers/auth/auth";
import {finalize} from "rxjs/operators";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl : LoadingController,public authProvider : AuthProvider,public toastCtrl : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signup(){
    this.navCtrl.push(SignupPage);
  }

  login(value: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Logging in ...'
    });
    loading.present();

    this.authProvider.login(value)
      .pipe(finalize(() => loading.dismissAll()))
      .subscribe(
        () => {},
        err => this.handleError(err)
      )
  }

  handleError(error : any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Login failed';
    } else {
      message = `Unexpected erroe: ${error.statusText}`;
    }

const toast = this.toastCtrl.create({
  message,
  duration : 9000,
  position : 'bottom'
});
    toast.present();
  }


}
