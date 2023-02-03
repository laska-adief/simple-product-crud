import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';
import Swal from 'sweetalert2';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnChanges {

  @Input() showAddProductDialog: Boolean = false;
  @Input() showEditProductDialog: Boolean = false;
  @Input() productSelected!: Product;
  @Output() closeDialogProduct: EventEmitter<boolean> = new EventEmitter<boolean>;

  subs!: Subscription;

  categories: object[] = [
    {name:"Electronics", value:"electronics"},
    {name:"Jewelery", value:"jewelery"},
    {name:"Men's Clothing", value:"men's clothing"},
    {name:"Women's Clothing", value:"women's clothing"},
  ];

  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.initProductForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("CHANGES", changes);
    if(this.showEditProductDialog && this.productSelected) {
      this.productForm.patchValue(this.productSelected);
    }
  }

  initProductForm(){
    this.productForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  addProduct() {
    const product = this.productForm.value;
    delete product?.id;
    this.subs = this.productService.addProduct(product).subscribe(
      ((resp: any) => {
        if(resp) {
          console.log("added product", resp);
          Swal.fire({
            icon: 'success',
            title: 'Product Added!',
            html: `
              Product Name : ${resp?.title} <br>
              Product Price : ${resp?.price} <br>
              Product Category : ${resp?.category} <br>
              Product Description : ${resp?.description} <br>
              Product Image : ${resp?.image} <br>
            `,
            confirmButtonText: 'OK'
          })
        }
      }),
    );

    this.closeDialog();
  }

  editProduct() {
    const id = this.productForm.value.id;
    console.log("ID", id)
    const product = this.productForm.value;
    delete product?.id;
    this.subs = this.productService.updateProduct(id, product).subscribe(
      ((resp: any) => {
        if(resp) {
          console.log("added product", resp);
          Swal.fire({
            icon: 'success',
            title: 'Product Updated!',
            html: `
              Product Name : ${resp?.title} <br>
              Product Price : ${resp?.price} <br>
              Product Category : ${resp?.category} <br>
              Product Description : ${resp?.description} <br>
              Product Image : ${resp?.image} <br>
            `,
            confirmButtonText: 'OK'
          })
        }
      }),
    );

    this.closeDialog();
  }

  closeDialog() {
    this.closeDialogProduct.emit(true);
    this.productForm.reset();
  }

}
