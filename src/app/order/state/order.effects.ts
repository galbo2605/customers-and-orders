import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {mergeMap, map, catchError} from 'rxjs/operators';

import {OrderService} from '../order.service';
import {Order} from '../order';

/* NgRx */
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as orderActions from './order.actions';

@Injectable()
export class OrderEffects {

  constructor(private orderService: OrderService,
              private actions$: Actions) {
  }

  @Effect()
  loadOrders$: Observable<Action> = this.actions$.pipe(
    ofType(orderActions.OrderActionTypes.Load),
    mergeMap(action =>
      this.orderService.getOrders().pipe(
        map(orders => (new orderActions.LoadSuccess(orders))),
        catchError(err => of(new orderActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  loadOrdersByCustomerId$: Observable<Action> = this.actions$.pipe(
    ofType(orderActions.OrderActionTypes.LoadByCustomerId),
    map((action: orderActions.LoadByCustomerId) => action.payload),
    mergeMap((customerId: number) =>
      this.orderService.getOrdersByCustomerId(customerId).pipe(
        map(orders => (new orderActions.LoadByCustomerIdSuccess(orders))),
        catchError(err => of(new orderActions.LoadByCustomerIdFail(err)))
      )
    )
  );

  @Effect()
  updateOrder$: Observable<Action> = this.actions$.pipe(
    ofType(orderActions.OrderActionTypes.UpdateOrder),
    map((action: orderActions.UpdateOrder) => action.payload),
    mergeMap((order: Order) =>
      this.orderService.updateOrder(order).pipe(
        map(updatedOrder => (new orderActions.UpdateOrderSuccess(updatedOrder))),
        catchError(err => of(new orderActions.UpdateOrderFail(err)))
      )
    )
  );

  @Effect()
  createOrder$: Observable<Action> = this.actions$.pipe(
    ofType(orderActions.OrderActionTypes.CreateOrder),
    map((action: orderActions.CreateOrder) => action.payload),
    mergeMap((order: Order) =>
      this.orderService.createOrder(order).pipe(
        map(newOrder => (new orderActions.CreateOrderSuccess(newOrder))),
        catchError(err => of(new orderActions.CreateOrderFail(err)))
      )
    )
  );

  @Effect()
  deleteOrder$: Observable<Action> = this.actions$.pipe(
    ofType(orderActions.OrderActionTypes.DeleteOrder),
    map((action: orderActions.DeleteOrder) => action.payload),
    mergeMap((orderId: number) =>
      this.orderService.deleteOrder(orderId).pipe(
        map(() => (new orderActions.DeleteOrderSuccess(orderId))),
        catchError(err => of(new orderActions.DeleteOrderFail(err)))
      )
    )
  );
}
