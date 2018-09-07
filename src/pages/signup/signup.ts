import {Component, ViewChild} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {NgModel} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {finalize} from 'rxjs/operators';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  @ViewChild('email')
  usernameModel: NgModel;

  constructor(
    private readonly navCtrl: NavController,
    private readonly authProvider: AuthProvider,
    private readonly loadingCtrl: LoadingController,
    private readonly toastCtrl: ToastController) {
  }

  signup(value: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Signing up ...'
    });

    loading.present();

    this.authProvider
      .signup(value)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        (jwt) => this.showSuccesToast(jwt),
        err => this.handleError(err));

    this.navCtrl.push(LoginPage);
  }

  private showSuccesToast(jwt) {
    const toast = this.toastCtrl.create({
      message: 'Sign up successful',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  handleError(error: any) {
    let message = `Unexpected error occurred`;

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
