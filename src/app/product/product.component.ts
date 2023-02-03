import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Product } from '../interface/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  subs!: Subscription;
  products: Product[] = [];
  productSelected!: Product;
  showAddProductDialog: Boolean = false;
  showEditProductDialog: Boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.subs = this.productService.getAllProducts().subscribe(
      (resp) => {
        if(resp?.length) {
          this.products = resp;
        }
      },
      (err) => {
        console.error('Error', err);
      }
    )
  }

  addProduct(){
    this.showAddProductDialog = true;
  }

  closeDialogProduct() {
    this.showAddProductDialog = false;
    this.showEditProductDialog = false;
  }

  editProduct(product:Product){
    this.productSelected = product;
    this.showEditProductDialog = true;
  }
  deleteProduct(productId: String, product:Product){
    Swal.fire({
      icon: 'question',
      title: 'Are you sure want to delete this product ?',
      html: `
        Product Name : ${product?.title} <br>
        Product Price : ${product?.price} <br>
        Product Category : ${product?.category} <br>
        Product Description : ${product?.description} <br>
        Product Image : ${product?.image} <br>
      `,
      confirmButtonText: 'Yes, I Am Sure',
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(
          (resp:any) => {
            if(resp) {
              Swal.fire({
                icon: 'success',
                title: 'Product Deleted',
                confirmButtonText: 'OK'
              });
            }
          }
        )
      }
    })

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
