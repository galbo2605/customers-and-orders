import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromOrders from './order.reducer';

// Extends the app state to include the order feature.
// This is required because orders are lazy loaded.
// So the reference to OrderState cannot be added to app.state.ts directly.
export interface State extends fromRoot.AppState {
  orders: fromOrders.OrderState;
}

// Selector functions
const getOrderFeatureState = createFeatureSelector<fromOrders.OrderState>('orders');

export const getCurrentOrderId = createSelector(
  getOrderFeatureState,
  state => state.currentOrderId
);

export const getCurrentOrder = createSelector(
  getOrderFeatureState,
  getCurrentOrderId,
  (state, currentOrderId) => {
    if (currentOrderId === 0) {
      return {
        id: 0,
        customerId: 0,
        orderName: '',
        orderNumber: 0,
        starRating: 0,
        description: ''
      };
    } else {
      return currentOrderId ? state.orders.find(c => c.id === currentOrderId) : null;
    }
  }
);

export const getOrders = createSelector(
  getOrderFeatureState,
  state => state.orders
);

export const getOrdersByCustomerId = createSelector(
  getOrderFeatureState,
  state => state.orderByCustomerId
);

export const getError = createSelector(
  getOrderFeatureState,
  state => state.error
);
