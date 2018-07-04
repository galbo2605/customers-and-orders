import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Order} from '../../order';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  pageTitle = 'Order';

  @Input() orders$: Observable<Order[]>;
  @Input() selectedOrder: Order;
  @Input() errorMessage: string;
  @Output() initializeNewOrder = new EventEmitter<void>();

  @Output() selected = new EventEmitter<Order>();
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

  newOrder(): void {
    this.dataSource.paginator = this.paginator;
    this.initializeNewOrder.emit();
  }

  orderSelected(order: Order): void {
    this.selected.emit(order);
  }
}
