import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: any = [];
  myForm: FormGroup;
  updateProductDetails: FormGroup;
  closeResult = '';
  modalContent:undefined;
  editContent:undefined;
  
  searchProduct;

  user_id: String;
  productId: string;
  udetails: any [];

  constructor(private modalService: NgbModal,
     private reactiveFormModule:ReactiveFormsModule,
     private productService: ProductService,
     private fb: FormBuilder,
     private router:Router) 
     
     { 

      // Retrieve cpus from the API
      this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      console.log(products)
      });

  }

  open(content, product) {
    //this.modalContent = content;
    this.modalContent = product
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  edit(content2, product) {
    //this.modalContent = content;
    this.modalContent = product
    this.productId = product._id;
    console.log(this.productId)
    console.log(content2)
    console.log(product)
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'});
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      productName: '',
      productPrice: '',
      productType: '',
      productBrand: '',
      productDescription: ''
      });

      this.updateProductDetails = this.fb.group({
        editProductName: '',
        editProductPrice: '',
        editProductType: '',
        editProductBrand: '',
        editProductDescription: ''
      })
      
  }
  
  onSubmit(){
    this.productService.insertProduct(
      this.myForm.value.productName,
      this.myForm.value.productPrice, 
      this.myForm.value.productType,  
      this.myForm.value.productBrand, 
      this.myForm.value.productDescription).subscribe(results => {
    location.reload();
    });
    }

    deleteProduct(id: number)
    {
      this.productService.deleteProduct(id).subscribe(results => {
      location.reload();
      });
    }

    updateProduct()
      {
        console.log(this.productId)
      this.productService.updateProduct(this.productId,
      this.updateProductDetails.value.editProductName, 
      this.updateProductDetails.value.editProductPrice,
      this.updateProductDetails.value.editProductType, 
      this.updateProductDetails.value.editProductBrand, 
      this.updateProductDetails.value.editProductDescription).subscribe(results => {
      location.reload();
    });
  }

  addToCart(product){
    var uid = sessionStorage.getItem('uid');
    var productId = product._id;
    var productName = product.productName;
    var productPrice = product.productPrice;
    this.productService.addToCart(uid, productId, productName, productPrice).subscribe(result => {
      console.log(result)
    });
  }

}
