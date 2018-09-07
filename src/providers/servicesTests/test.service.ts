import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TEST_URL, SERVER_URL } from "../../config";
import {Storage} from "@ionic/storage";


@Injectable()
export class TestService{
    
  private countActive = 'is_active_count';


  constructor(    
    private readonly storage: Storage,
    public http: HttpClient) {
  }

    
  setActiveCount(value) {

    return this.storage.set(this.countActive, value)
      .then(() => value);
  }

  getActiveCount() {
    return this.storage.get(this.countActive)
      .then((res) => res);
  }

  solicitarCuenta() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  
    return new Promise(resolve => {
      this.http.get(`${SERVER_URL}/accounts`, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  asociarCuenta() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  
    return new Promise(resolve => {
      this.http.get(`${SERVER_URL}/catalogs/cards`, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }



	getTest() {

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
          ,'x-access-token': 'my-auth-token'
        })
      };
  

    return new Promise(resolve => {
      this.http.get(`${TEST_URL}`, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }


}
