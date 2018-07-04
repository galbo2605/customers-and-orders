import {Component} from '@angular/core';
import {customers} from './customer/customer-data';
import {orders} from './order/order-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    localStorage.setItem('customers-list', JSON.stringify(customers));
    localStorage.setItem('orders-list', JSON.stringify(orders));
  }
}
