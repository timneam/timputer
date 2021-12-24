import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts() {
    return this.http.get<any[]>('./api/products');
    }

    insertProduct (name: string, price: number,  type: string,  brand: string,  description: string) {
      return this.http.post<any[]>('./api/products/', {'productName': name, 'productPrice': price, 'productType': type, 'productBrand': brand, 'productDescription': description });
      } 

      deleteProduct(id: number) {
        return this.http.delete<any[]>('./api/products/' + id);
        }

        
      updateProduct(id, name: string, price: number,  type: string,  brand: string,  description: string) {
        return this.http.put<any[]>('./api/products/' + id, {'productName': name, 'productPrice': price, 'productType': type, 'productBrand': brand, 'productDescription': description });
        }

        addToCart(userId: string, productId: string, name: string, price: number){
          return this.http.post<any[]>('./api/carts',{
            'userId': userId,
            'productId': productId,
            'productName': name,
            'productPrice': price
          });
       }

       getItemsInCart(userId:string) {
         return this.http.get<any[]>('./api/carts/' + userId);
       }

       deleteItemFromCart(id){
        return this.http.delete<any[]>('./api/carts/' + id);
      }

}
