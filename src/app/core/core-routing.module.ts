import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const coreRoutingPaths: Routes = [
  {path: 'customers', loadChildren: '../customer/customer.module#CustomerModule'},
  {path: 'orders', loadChildren: '../order/order.module#OrderModule'},
  {path: '', redirectTo: 'customers', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(coreRoutingPaths, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
