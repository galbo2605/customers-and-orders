import {Injectable} from '@angular/core';

import {Observable, of, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

import {Order} from './order';

@Injectable({providedIn: 'root'})
export class OrderService {

  getOrders(): Observable<Order[]> {
    const orders = this.getLocalStorageOrders();
    return of(orders)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getOrdersByCustomerId(customerId: number): Observable<Order[]> {
    const orders = this.getLocalStorageOrders();
    const ordersByCustomerId = orders.filter(order => order.customerId === +customerId);
    return of(ordersByCustomerId)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createOrder(order: Order): Observable<Order> {
    const orders = this.getLocalStorageOrders();
    const maxID = Math.max(...orders.map(c => c.id));
    order.id = maxID + 1;
    orders.push(order);
    this.updateLocalStorageOrders(orders);
    return of(order)
      .pipe(
        tap(data => console.log('createOrder: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteOrder(id: number): Observable<{}> {
    const orders = this.getLocalStorageOrders().filter(order => order.id !== id);
    this.updateLocalStorageOrders(orders);
    return of(orders)
      .pipe(
        tap(data => console.log('deleteOrder: ' + id)),
        catchError(this.handleError)
      );
  }

  updateOrder(order: Order): Observable<Order> {
    const orders = this.getLocalStorageOrders();
    const updatedOrders = orders.map(item => order.id === item.id ? order : item);
    this.updateLocalStorageOrders(updatedOrders);
    return of(order)
      .pipe(
        tap(() => console.log('updateOrder: ' + order.id)),
        // Return the order on an update
        map(() => order),
        catchError(this.handleError)
      );
  }

  // simulate read
  private getLocalStorageOrders(): Order[] {
    return JSON.parse(localStorage.getItem('orders-list'));
  }

  // simulate create/update/delete
  private updateLocalStorageOrders(orders: Order[]) {
    localStorage.setItem('orders-list', JSON.stringify(orders));
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}

