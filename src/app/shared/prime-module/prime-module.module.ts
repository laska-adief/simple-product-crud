import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';

const PrimeModule = [
  ButtonModule,
  TabViewModule,
  TableModule,
  DialogModule,
  InputTextModule,
  DropdownModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimeModule
  ],
  exports: [PrimeModule]
})
export class PrimeModuleModule { }
