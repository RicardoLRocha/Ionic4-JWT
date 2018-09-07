import {Component} from '@angular/core';

import {JwtHelperService} from "@auth0/angular-jwt";

import {AuthProvider} from "../../providers/auth/auth";
import { TestService } from '../../providers/servicesTests/test.service';
import { ModalController } from 'ionic-angular';
import { FilterComponent } from "../../componentes/commons/FilterComponent";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: string;
  message: string;
  disableButton: boolean = false;
  opcionesCuenta: any = [];

  constructor(
    public modalController : ModalController,
    private readonly authProvider: AuthProvider,
    jwtHelper: JwtHelperService,
    private testService :TestService ) {

    this.authProvider.authUser.subscribe(jwt => {

      if (jwt) {
        const decoded = jwtHelper.decodeToken(jwt);
        this.user = decoded.firstname
      }
      else {
        this.user = null;
      }
    });

  }

  ionViewWillEnter() {

    this.testService.getActiveCount().then(data => {
      this.disableButton = data;
    });

  }

  updateCount() {
    this.testService.asociarCuenta()
    .then(res => {
      this.opcionesCuenta = res;
    });
  }

  bindCount() {
    this.testService.solicitarCuenta()
    .then(res => {
      console.log(res);
      this.testService.setActiveCount('true').then( d => {
        console.log(d);
      })
    });

  }
  

  openModal(){
    let data = { datahome:  this.opcionesCuenta.response.type_cards };
    let modal = this.modalController.create(FilterComponent, data);
    modal.onDidDismiss(data => {
      console.log (data);  
    });

    modal.present();
  }

  logout() {
    this.authProvider.logout();
  }

}

/*

curl -d '{ "email": "ricardolopez.computing@gmail.com", "firstname": "Ricardo","lastname": "Lopez","password": "ricardolopez"}' -H "Content-Type: application/json" -X POST https://mighty-refuge-81707.herokuapp.com/api/auth/user/create
curl -d '{ "email": "ricardolopez.computing@gmail.com","password": "ricardolopez"}' -H "Content-Type: application/json" -X POST https://mighty-refuge-81707.herokuapp.com/api/auth/user/authenticate


Token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTA0MTdiZDcyNTNjMDAyY2Q1NjU1YiIsImVtYWlsIjoicmljYXJkb2xvcGV6LmNvbXB1dGluZ0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJSaWNhcmRvIiwibGFzdG5hbWUiOiJMb3BleiIsImlhdCI6MTUzNjE4MDY1MSwiZXhwIjoxNTM3NDc2NjUxfQ.XBiPWQtQ5mwdYdSPaY9qk4S0gg3f1dbeSv5TYTcoArs

-- nuestras cuentas, solicitar
curl -H "Content-Type: application/json" -H "X-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTA0MTdiZDcyNTNjMDAyY2Q1NjU1YiIsImVtYWlsIjoicmljYXJkb2xvcGV6LmNvbXB1dGluZ0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJSaWNhcmRvIiwibGFzdG5hbWUiOiJMb3BleiIsImlhdCI6MTUzNjE4MDY1MSwiZXhwIjoxNTM3NDc2NjUxfQ.XBiPWQtQ5mwdYdSPaY9qk4S0gg3f1dbeSv5TYTcoArs" -X GET https://mighty-refuge-81707.herokuapp.com/api/accounts

-- Alimentar de una cuenta
curl -H "Content-Type: application/json" -H "X-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTA0MTdiZDcyNTNjMDAyY2Q1NjU1YiIsImVtYWlsIjoicmljYXJkb2xvcGV6LmNvbXB1dGluZ0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJSaWNhcmRvIiwibGFzdG5hbWUiOiJMb3BleiIsImlhdCI6MTUzNjE4MDY1MSwiZXhwIjoxNTM3NDc2NjUxfQ.XBiPWQtQ5mwdYdSPaY9qk4S0gg3f1dbeSv5TYTcoArs" -X GET https://mighty-refuge-81707.herokuapp.com/api/catalogs/cards

{"response":{"_id":"5b7ae88fe0669b1028c3d12b","type_cards":[{"type":"TDC","name":"Tarjeta de Credito"},{"type":"TDD","name":"Tarjeta de Debito"}]}}



curl -d '{ "userId": "5b90417bd7253c002cd5655b", "type": "TDC", "name": "Tarjeta de Credito" }' -H "Content-Type: application/json" -H "X-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTA0MTdiZDcyNTNjMDAyY2Q1NjU1YiIsImVtYWlsIjoicmljYXJkb2xvcGV6LmNvbXB1dGluZ0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJSaWNhcmRvIiwibGFzdG5hbWUiOiJMb3BleiIsImlhdCI6MTUzNjE4MDY1MSwiZXhwIjoxNTM3NDc2NjUxfQ.XBiPWQtQ5mwdYdSPaY9qk4S0gg3f1dbeSv5TYTcoArs" -X POST https://mighty-refuge-81707.herokuapp.com/api/accounts
curl -d '{ "userId": "5b90417bd7253c002cd5655b", "type": "TDC", "name": "Tarjeta de Debito" }' -H "Content-Type: application/json" -H "X-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTA0MTdiZDcyNTNjMDAyY2Q1NjU1YiIsImVtYWlsIjoicmljYXJkb2xvcGV6LmNvbXB1dGluZ0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJSaWNhcmRvIiwibGFzdG5hbWUiOiJMb3BleiIsImlhdCI6MTUzNjE4MDY1MSwiZXhwIjoxNTM3NDc2NjUxfQ.XBiPWQtQ5mwdYdSPaY9qk4S0gg3f1dbeSv5TYTcoArs" -X POST https://mighty-refuge-81707.herokuapp.com/api/accounts


*/

