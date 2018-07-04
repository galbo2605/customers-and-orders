import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Customer} from '../../customer';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/index';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  pageTitle = 'Customers';

  @Input() customers$: Observable<Customer[]>;
  @Input() selectedCustomer: Customer;
  @Input() errorMessage: string;
  @Output() initializeNewCustomer = new EventEmitter<void>();

  @Output() selected = new EventEmitter<Customer>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Customer>();

  displayedColumns = ['Name', 'Email', 'Country', 'City', 'Street'];
  tableColumns = [
    {header: 'Name', property: 'customerName'},
    {header: 'Email', property: 'customerEmail'},
    {header: 'Country', property: 'country'},
    {header: 'City', property: 'city'},
    {header: 'Street', property: 'street'},
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.customers$.subscribe(data => this.dataSource.data = data);
    this.dataSource.paginator = this.paginator;
  }

  newCustomer(): void {
    this.dataSource.paginator = this.paginator;
    this.initializeNewCustomer.emit();
  }

  customerSelected(customer: Customer): void {
    this.router.navigate([], {
      queryParams: {id: customer.id}
    });
    this.selected.emit(customer);
  }
}
