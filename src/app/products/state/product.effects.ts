import { Injectable } from '@angular/core';

import { Product } from '../product';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// services
import { ProductService } from '../product.service';

/* NgRX */
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.action';

@Injectable()

export class ProductEffects {
     constructor(private actions$: Actions,
                 private _productService: ProductService) {}

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this._productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err => of(new productActions.LoadFail(err)))
        ))
    );

}
