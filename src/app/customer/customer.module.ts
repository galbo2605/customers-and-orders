import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SharedModule} from '../shared/shared.module';

import {CustomersListComponent} from './components/customers-list/customers-list.component';
import {CustomersEditComponent} from './components/customers-edit/customers-edit.component';
import {CustomerOrdersListComponent} from './components/customer-orders-list/customer-orders-list.component';
import {CustomerShellComponent} from './containers/customer-shell/customer-shell.component';

// NgRx
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {CustomerEffects} from './state/customer.effects';
import {reducer} from './state/customer.reducer';

const customerRoutes: Routes = [
  { path: '', component: CustomerShellComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(customerRoutes),
    StoreModule.forFeature('customers', reducer),
    EffectsModule.forFeature([CustomerEffects])
  ],
  declarations: [
    CustomersListComponent,
    CustomersEditComponent,
    CustomerOrdersListComponent,
    CustomerShellComponent
  ]
})
export class CustomerModule {
}
