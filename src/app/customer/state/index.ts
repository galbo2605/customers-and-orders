import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromCustomers from './customer.reducer';

// Extends the app state to include the customer feature.
// This is required because customers are lazy loaded.
// So the reference to CustomerState cannot be added to app.state.ts directly.
export interface State extends fromRoot.AppState {
  customers: fromCustomers.CustomerState;
}

// Selector functions
const getCustomerFeatureState = createFeatureSelector<fromCustomers.CustomerState>('customers');

export const getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  state => state.currentCustomerId
);

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  (state, currentCustomerId) => {
    if (currentCustomerId === 0) {
      return {
        id: 0,
        customerName: '',
        customerEmail: '',
        country: '',
        city: '',
        street: '',
      };
    } else {
      return currentCustomerId ? state.customers.find(c => c.id === currentCustomerId) : null;
    }
  }
);

export const getCustomers = createSelector(
  getCustomerFeatureState,
  state => state.customers
);

export const getError = createSelector(
  getCustomerFeatureState,
  state => state.error
);
