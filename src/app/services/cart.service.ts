import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getAllItemsInCart() {
    return this.http.get<any[]>('./api/carts');
    }

    insertItemToCart (productId, customerId, name: string, price: number, type: string,  brand: string,  description: string) {
      return this.http.post<any[]>('./api/carts/', {'productId': productId, 'customerId':customerId, 'productName': name, 'productPrice': price, 'productType': type, 'productBrand': brand, 'productDescription': description });
      } 

      deleteItemFromCart (id) {
        return this.http.delete<any[]>('./api/carts/' + id);
      }

}
