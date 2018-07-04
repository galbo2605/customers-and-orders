import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../../order/order';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-customer-orders-list',
  templateUrl: './customer-orders-list.component.html',
  styleUrls: ['./customer-orders-list.component.css']
})
export class CustomerOrdersListComponent implements OnInit {
  pageTitle = 'Customer Orders';

  @Input() orders$: Observable<Order[]>;
  @Input() errorMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Order>();

  displayedColumns = ['Name', 'Order Number', 'Rating', 'Description'];
  tableColumns = [
    {header: 'Name', property: 'orderName'},
    {header: 'Order Number', property: 'orderNumber'},
    {header: 'Rating', property: 'starRating'},
    {header: 'Description', property: 'description'},
  ];

  ngOnInit() {
    this.orders$.subscribe(data => this.dataSource.data = data);
    this.dataSource.paginator = this.paginator;
  }
}
