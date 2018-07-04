import {Component} from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent {
  links = [{header: 'Customers', route: 'customers'}, {header: 'Orders', route: 'orders'}];
  activeLink = this.links[0];

  constructor() {
  }
}
