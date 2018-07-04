import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromOrder from './../../state';
import * as orderActions from '../../state/order.actions';
import {Order} from '../../order';
import {MatDialog} from '@angular/material';
import {OrdersEditComponent} from '../../components/orders-edit/orders-edit.component';
import {slideInDownAnimation} from '../../../animations/slideInDown.animations';

@Component({
  templateUrl: './order-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`.container {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
  }`],
  animations: [slideInDownAnimation]
})
export class OrderShellComponent implements OnInit {
  @HostBinding('@slideInDownAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  selectedOrder$: Observable<Order>;
  orders$: Observable<Order[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromOrder.State>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(new orderActions.Load());
    this.orders$ = this.store.pipe(select(fromOrder.getOrders));
    this.errorMessage$ = this.store.pipe(select(fromOrder.getError));
    this.selectedOrder$ = this.store.pipe(select(fromOrder.getCurrentOrder));
  }

  newOrder(): void {
    this.store.dispatch(new orderActions.InitializeCurrentOrder());

    const dialogRef = this.dialog.open(OrdersEditComponent, {data: {id: 0}});
    this.onDialog(dialogRef);
  }

  orderSelected(order: Order): void {
    this.store.dispatch(new orderActions.SetCurrentOrder(order));

    const dialogRef = this.dialog.open(OrdersEditComponent, {data: order});
    this.onDialog(dialogRef);
  }

  deleteOrder(order: Order): void {
    this.store.dispatch(new orderActions.DeleteOrder(order.id));
  }

  clearOrder(): void {
    this.store.dispatch(new orderActions.ClearCurrentOrder());
  }

  saveOrder(order: Order): void {
    this.store.dispatch(new orderActions.CreateOrder(order));
  }

  updateOrder(order: Order): void {
    this.store.dispatch(new orderActions.UpdateOrder(order));
  }

  onDialog(dialogRef) {
    dialogRef.afterClosed().subscribe(result => {
      console.log({'result': result});
      try {
        switch (result.type) {
          case 'delete':
            this.deleteOrder(result.order);
            break;
          case 'clearCurrent':
            this.clearOrder();
            break;
          case 'create':
            this.saveOrder(result.order);
            break;
          case 'update':
            this.updateOrder(result.order);
            break;
          default:
            break;
        }
      } catch (e) {
        console.log('switchCase error');
      }
    });
  }
}
