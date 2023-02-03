import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { PrimeModuleModule } from '../shared/prime-module/prime-module.module';
import { AddProductComponent } from './add-product/add-product.component';
import { UtilityModule } from '../shared/utility/utility.module';


@NgModule({
  declarations: [ProductComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    PrimeModuleModule,
    UtilityModule
  ],
  exports: [ProductComponent]
})
export class ProductModule { }
