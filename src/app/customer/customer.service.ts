import {Injectable} from '@angular/core';

import {Observable, of, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CustomerService {

  constructor() {
  }

  getCustomers(): Observable<Customer[]> {
    const customers = this.getLocalStorageCustomers();
    this.updateLocalStorageCustomers(customers);
    return of(customers)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createCustomer(customer: Customer): Observable<Customer> {
    const customers = this.getLocalStorageCustomers();
    const maxID = Math.max(...customers.map(c => c.id));
    customer.id = maxID + 1;
    customers.push(customer);
    this.updateLocalStorageCustomers(customers);
    return of(customer)
      .pipe(
        tap(data => console.log('createCustomer: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteCustomer(id: number): Observable<{}> {
    const customers = this.getLocalStorageCustomers().filter(customer => customer.id !== id);
    this.updateLocalStorageCustomers(customers);
    return of(customers)
      .pipe(
        tap(data => console.log('deleteCustomer: ' + id)),
        catchError(this.handleError)
      );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const customers = this.getLocalStorageCustomers();
    const updatedCustomers = customers.map(item => customer.id === item.id ? customer : item);
    this.updateLocalStorageCustomers(updatedCustomers);
    return of(customer)
      .pipe(
        tap(() => console.log('updateCustomer: ' + customer.id)),
        // Return the customer on an update
        map(() => customer),
        catchError(this.handleError)
      );
  }

  // simulate read
  private getLocalStorageCustomers(): Customer[] {
    return JSON.parse(localStorage.getItem('customers-list'));
  }

  // simulate create/update/delete
  private updateLocalStorageCustomers(customers: Customer[]) {
    localStorage.setItem('customers-list', JSON.stringify(customers));
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

import {Customer} from './customer';
