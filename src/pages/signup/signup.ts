import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {finalize} from "rxjs/operators";
import {NgModel} from "@angular/forms";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
@ViewChild('username')
usernameModel : NgModel;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController, public authProvider : AuthProvider, public toastCtrl : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signup( value: any){
    let loading = this.loadingCtrl.create({
      spinner : 'bubble',
      content : 'Signing up ...'
    });
    loading.present();


    this.authProvider
      .signup(value)
      .pipe(finalize(() => loading.dismissAll()))
      .subscribe(
        (jwt) => this.showSuccesToast(jwt),
        err => this.handleError(err))

  }
  public showSuccesToast(jwt){
    if (jwt !== 'EXIST'){
      const toast = this.toastCtrl.create({
        message : 'Sign up successful',
        duration : 3000,
        position : 'bottom'
      });
      toast.present();
    } else{
      const toast = this.toastCtrl.create({
        message : 'Username already registered',
        duration : 3000,
        position : 'bottom'
      });
      toast.present();
      this.usernameModel.control.setErrors({'usernameTaken' : true});
    }
  }
 handleError(error : any){
    let message = `Unexpected error occurd`;
    const toast = this.toastCtrl.create({
      message,
      duration : 3000,
      position : 'bottom'
    });
    toast.present();
 }
}
