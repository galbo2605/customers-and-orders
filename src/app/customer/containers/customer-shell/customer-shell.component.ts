import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable, of} from 'rxjs';

import * as fromOrder from '../../../order/state/';
import * as orderActions from '../../../order/state/order.actions';
import * as fromCustomer from './../../state';
import * as customerActions from './../../state/customer.actions';
import {Customer} from '../../customer';
import {Order} from '../../../order/order';
import {ActivatedRoute, Params} from '@angular/router';
import {slideInDownAnimation} from '../../../animations/slideInDown.animations';

@Component({
  templateUrl: './customer-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`.container {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
  }`],
  animations: [slideInDownAnimation]
})
export class CustomerShellComponent implements OnInit {
  @HostBinding('@slideInDownAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  selectedCustomer$: Observable<Customer>;
  customers$: Observable<Customer[]>;
  orders$: Observable<Order[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromCustomer.State>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.dispatch(new customerActions.Load());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
    this.orders$ = this.store.pipe(select(fromOrder.getOrdersByCustomerId));
    this.errorMessage$ = this.store.pipe(select(fromCustomer.getError));
    this.selectedCustomer$ = this.store.pipe(select(fromCustomer.getCurrentCustomer));
    this.route.queryParams.subscribe((customer: Params) => {
      this.store.dispatch(new orderActions.LoadByCustomerId(customer.id));
    });
  }

  newCustomer(): void {
    this.store.dispatch(new customerActions.InitializeCurrentCustomer());
  }

  customerSelected(customer: Customer): void {
    this.store.dispatch(new customerActions.SetCurrentCustomer(customer));
  }

  deleteCustomer(customer: Customer): void {
    this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
  }

  clearCustomer(): void {
    this.store.dispatch(new customerActions.ClearCurrentCustomer());
  }

  saveCustomer(customer: Customer): void {
    this.store.dispatch(new customerActions.CreateCustomer(customer));
  }

  updateCustomer(customer: Customer): void {
    this.store.dispatch(new customerActions.UpdateCustomer(customer));
  }

}
