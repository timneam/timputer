import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  uid: string; 
  cartItems: any [];

  constructor(
    private productService: ProductService,
    private authService:AuthService) { }

  ngOnInit() {
      this.uid = sessionStorage.getItem('uid')
      console.log(this.uid);
      this.productService.getItemsInCart(this.uid).subscribe(result => {
      this.cartItems = result;
      console.log(this.cartItems);
    });
  }

  deleteItem(id){
    this.productService.deleteItemFromCart(id).subscribe((results) => {
    console.log(results);
    location.reload();
    });
    }

}
