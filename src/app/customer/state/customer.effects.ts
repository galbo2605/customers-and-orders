import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as customerActions from './customer.actions';

@Injectable()
export class CustomerEffects {

  constructor(private customerService: CustomerService,
              private actions$: Actions) { }

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.Load),
    mergeMap(action =>
      this.customerService.getCustomers().pipe(
        map(customers => (new customerActions.LoadSuccess(customers))),
        catchError(err => of(new customerActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.UpdateCustomer),
    map((action: customerActions.UpdateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.updateCustomer(customer).pipe(
        map(updatedCustomer => (new customerActions.UpdateCustomerSuccess(updatedCustomer))),
        catchError(err => of(new customerActions.UpdateCustomerFail(err)))
      )
    )
  );

  @Effect()
  createCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.CreateCustomer),
    map((action: customerActions.CreateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.createCustomer(customer).pipe(
        map(newCustomer => (new customerActions.CreateCustomerSuccess(newCustomer))),
        catchError(err => of(new customerActions.CreateCustomerFail(err)))
      )
    )
  );

  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.CustomerActionTypes.DeleteCustomer),
    map((action: customerActions.DeleteCustomer) => action.payload),
    mergeMap((customerId: number) =>
      this.customerService.deleteCustomer(customerId).pipe(
        map(() => (new customerActions.DeleteCustomerSuccess(customerId))),
        catchError(err => of(new customerActions.DeleteCustomerFail(err)))
      )
    )
  );
}
