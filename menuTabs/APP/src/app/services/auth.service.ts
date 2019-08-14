import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

const TOKEN_KEY = 'user-access-token';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  user: Observable<any>;
  private authState = new BehaviorSubject(null);

  url = 'http://192.168.1.40:8081/user/';

  constructor(private http: HttpClient,private router: Router, private storage: Storage) {
    this.loadUser();

    // Filter out null values which is first behaviour Subject value
    this.user = this.authState
      .asObservable()
      .pipe(filter(response => response));
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  loadUser() {
    // Normally load e.g. JWT at this point
    this.storage.get(TOKEN_KEY).then(data => {
      if (data) {
        this.authState.next(data);
      } else {
        this.authState.next({ email: null, role: null });
      }
    });
  }

  signIn(credentials) {
    let email = credentials.email;
    let pw = credentials.pw;
    let user = null;

    if (email === 'admin' && pw === 'admin') {
      user = { email, role: 'ADMIN' };
    } else if (email === 'user' && pw === 'user') {
      user = { email, role: 'USER' };
    }

    this.authState.next(user);

    // Normally you would store e.g. JWT
    this.storage.set(TOKEN_KEY, user);

    // Normally you would have a real user object at this point
    return of(user);
  }

  loginuser(email, password){
    let user = null;

    return this.http.post<any>(this.url+ 'login', JSON.stringify({email: email, password: password}), httpOptions).pipe(
      tap((data) => {

          user = { email, role: 'ADMIN' };
          this.authState.next(user);
          // Normally you would store e.g. JWT
          this.storage.set(TOKEN_KEY, user);

        }
      ),
      catchError(this.handleError<any>('addUser'))
    );
  }

  getUsers(){
    return this.http.get<any>(this.url+ 'getUsers', httpOptions).pipe(
      tap(() => console.log('user listing  w/ id =data)')),
      catchError(this.handleError<any>('getUsers'))
    );
  }

  getOneUser(id){
    return this.http.get(this.url + 'getOneUser/' + id).pipe(
      map(this.extractData));
  }

  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      const errorData = {
        status: false,
        message: 'Server Error'
      };
      // Let the app keep running by returning an empty result.
      return of(errorData);
    };
  }

  async signOut() {
    await this.storage.set(TOKEN_KEY, null);
    this.authState.next(null);
    this.router.navigateByUrl('/login');
  }
}