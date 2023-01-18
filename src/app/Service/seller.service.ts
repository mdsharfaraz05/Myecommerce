import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, SignUp } from '../Class/data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedin = new BehaviorSubject<boolean>(false);
  isLogginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) { }

  api_url = 'http://localhost:3000/Seller';

  userSignup(data: SignUp) {

    // console.log("Service Call")

    // return this.http.post(this.api_url, data);
    this.http.post(this.api_url, data, { observe: 'response' }).subscribe((result) => {

      // for local Storage Data hold on log in User
      localStorage.setItem('seller', JSON.stringify(result.body));
      // This Checked User login or not
      this.isSellerLoggedin.next(true);

      // this navigate Seller Home Page
      this.route.navigate(['seller-home'])
      console.warn('result', result)
    });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedin.next(true);
      this.route.navigate(['seller-home']);
    }
  }
  // Seller Login

  userLogin(data: login) {
    console.warn('User Log in', data);
    // api call code will be there

    this.http.get(`${this.api_url}?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result:any) => {
      console.log(result);
      if(result && result.body && result.body.length){
        console.log('User Logged in Successfully');
          // for local Storage Data hold on log in User
      localStorage.setItem('seller', JSON.stringify(result.body));

      // this navigate Seller Home Page
      this.route.navigate(['seller-home'])
      }else{
        console.log('User Logged in Failed');
        this.isLogginError.emit(true)
      }
    })
  }
}
