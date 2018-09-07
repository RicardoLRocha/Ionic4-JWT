import {Injectable} from "@angular/core";
import {tap} from 'rxjs/operators';
import {ReplaySubject, Observable} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {JwtHelperService} from "@auth0/angular-jwt";

import {SERVER_URL} from "../../config";

@Injectable()
export class AuthProvider {

  private jwtTokenName = 'jwt_token';

  authUser = new ReplaySubject<any>(1);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storage: Storage,
    private readonly jwtHelper: JwtHelperService) {
  }

  checkLogin() {
    console.log("checkLogin");

    this.storage.get(this.jwtTokenName).then(jwt => {

      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {

        this.httpClient.get(`${SERVER_URL}/auth/user/authenticate`)
          .subscribe(
            () => {
              this.authUser.next(jwt)
            },
            (err) => {
              this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null))
            }
          );
      }
      else {
        this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
      }
    });
  }

  login(values: any): Observable<any> {
    return this.httpClient.post(`${SERVER_URL}/auth/user/authenticate`, values, {responseType: 'text'})
      .pipe(tap(jwt => this.handleJwtResponse(jwt)));
  }

  logout() {
    this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
  }

  signup(values: any): Observable<any> {

    return this.httpClient.post(`${SERVER_URL}/auth/user/create`, values, {responseType: 'text'})
    .pipe(tap(res => {
      return true;
    }));
  }

  private handleJwtResponse(jwt: string) {
    return this.storage.set(this.jwtTokenName, jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }

}
