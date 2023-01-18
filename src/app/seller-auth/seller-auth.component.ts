import { Component, OnInit } from '@angular/core';
import { SellerService } from '../Service/seller.service';
import { Router } from '@angular/router';
import { login, SignUp } from '../Class/data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller: SellerService, private route: Router,) { }

  showlogin = false;
  authError:string=''

  ngOnInit(): void {
    this.seller.reloadSeller()
  }



  signup(data: SignUp): void {
    // console.log(data);

    this.seller.userSignup(data);
    // .subscribe((result)=>{
    //   console.log(result);

    //   if(result){
    //     this.route.navigateByUrl('seller-home')
    //   }
    // });  
  }

  login(data: login): void {

    // console.warn(data)
    this.seller.userLogin(data)
    // console.log( 'User Login',data)
    this.seller.isSellerLoggedin;
    this.seller.isLogginError.subscribe((iserror)=>{
      if(iserror){
        this.authError = 'Email or Password Incorrect'
      }
    })
  }

  openLogin() {
    this.showlogin = true;
  }
  openSignup() {
    this.showlogin = false;
  }
}
