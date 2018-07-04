import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OrdersListComponent} from './components/orders-list/orders-list.component';
import {OrdersEditComponent} from './components/orders-edit/orders-edit.component';
import {OrderShellComponent} from './containers/order-shell/order-shell.component';

// NgRx
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {OrderEffects} from './state/order.effects';
import {reducer} from './state/order.reducer';
import {SharedModule} from '../shared/shared.module';

const orderRoutes: Routes = [
  { path: '', component: OrderShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(orderRoutes),
    StoreModule.forFeature('orders', reducer),
    EffectsModule.forFeature([OrderEffects])
  ],
  declarations: [
    OrdersListComponent,
    OrdersEditComponent,
    OrderShellComponent
  ],
  entryComponents: [OrdersEditComponent]
})
export class OrderModule {
}
