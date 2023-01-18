import { Component, OnInit } from '@angular/core';
import { product } from '../Class/data-type';
import { ProductService } from '../Service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:undefined|product[];
  trendyProducts:undefined | product[];
   constructor(private product:ProductService) {}
 
   ngOnInit(): void {
     this.product.popularProducts().subscribe((data:any)=>{
       this.popularProducts=data;
     })
 
     this.product.trendyProducts().subscribe((data:any)=>{
       this.trendyProducts=data;
     })
   }
 }
 
