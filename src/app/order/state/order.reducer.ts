import {Order} from '../order';
import {OrderActionTypes, OrderActions} from './order.actions';

// State for this feature (Order)
export interface OrderState {
  orders: Order[];
  currentOrderId: number | null;
  orderByCustomerId: Order[];
  error: string;
}

const initialState: OrderState = {
  orders: [],
  currentOrderId: null,
  orderByCustomerId: [],
  error: ''
};

export function reducer(state = initialState, action: OrderActions): OrderState {

  switch (action.type) {
    case OrderActionTypes.SetCurrentOrder:
      return {
        ...state,
        currentOrderId: action.payload.id
      };

    case OrderActionTypes.ClearCurrentOrder:
      return {
        ...state,
        currentOrderId: null
      };

    case OrderActionTypes.InitializeCurrentOrder:
      return {
        ...state,
        currentOrderId: 0
      };

    case OrderActionTypes.LoadSuccess:
      return {
        ...state,
        orders: action.payload,
        error: ''
      };

    case OrderActionTypes.LoadFail:
      return {
        ...state,
        orders: [],
        error: action.payload
      };

    case OrderActionTypes.LoadByCustomerIdSuccess:
      return {
        ...state,
        orderByCustomerId: action.payload,
        error: ''
      };

    case OrderActionTypes.LoadByCustomerIdFail:
      return {
        ...state,
        orderByCustomerId: [],
        error: action.payload
      };

    case OrderActionTypes.UpdateOrderSuccess:
      const updatedOrders = state.orders.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        orders: updatedOrders,
        currentOrderId: action.payload.id,
        error: ''
      };

    case OrderActionTypes.UpdateOrderFail:
      return {
        ...state,
        error: action.payload
      };

    // After a create, the currentOrder is the new order.
    case OrderActionTypes.CreateOrderSuccess:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        currentOrderId: action.payload.id,
        error: ''
      };

    case OrderActionTypes.CreateOrderFail:
      return {
        ...state,
        error: action.payload
      };

    // After a delete, the currentOrder is null.
    case OrderActionTypes.DeleteOrderSuccess:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
        currentOrderId: null,
        error: ''
      };

    case OrderActionTypes.DeleteOrderFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
