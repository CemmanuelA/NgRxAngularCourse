import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Product } from '../../product';
import { Observable } from 'rxjs';

// services
import { ProductService } from '../../product.service';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../state';
import * as productActions from '../../state/product.action';

@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit  {


  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
