import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderNavComponent} from './header-nav/header-nav.component';
import {CoreComponent} from './core.component';
import {MaterialModule} from '../shared/material.module';
import {CoreRoutingModule} from './core-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CoreRoutingModule,
  ],
  declarations: [
    CoreComponent,
    HeaderNavComponent,
    PageNotFoundComponent
  ],
  exports: [CoreComponent],
  providers: [],
})
export class CoreModule {
}
