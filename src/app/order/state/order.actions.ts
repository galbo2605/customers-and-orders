import {Order} from '../order';

/* NgRx */
import {Action} from '@ngrx/store';

export enum OrderActionTypes {
  SetCurrentOrder = '[Order] Set Current Order',
  ClearCurrentOrder = '[Order] Clear Current Order',
  InitializeCurrentOrder = '[Order] Initialize Current Order',
  Load = '[Order] Load',
  LoadSuccess = '[Order] Load Success',
  LoadFail = '[Order] Load Fail',
  LoadByCustomerId = '[Order] LoadByCustomerId',
  LoadByCustomerIdSuccess = '[Order] LoadByCustomerId Success',
  LoadByCustomerIdFail = '[Order] LoadByCustomerId Fail',
  UpdateOrder = '[Order] Update Order',
  UpdateOrderSuccess = '[Order] Update Order Success',
  UpdateOrderFail = '[Order] Update Order Fail',
  CreateOrder = '[Order] Create Order',
  CreateOrderSuccess = '[Order] Create Order Success',
  CreateOrderFail = '[Order] Create Order Fail',
  DeleteOrder = '[Order] Delete Order',
  DeleteOrderSuccess = '[Order] Delete Order Success',
  DeleteOrderFail = '[Order] Delete Order Fail'
}

// Action Creators
export class SetCurrentOrder implements Action {
  readonly type = OrderActionTypes.SetCurrentOrder;

  constructor(public payload: Order) {
  }
}

export class ClearCurrentOrder implements Action {
  readonly type = OrderActionTypes.ClearCurrentOrder;
}

export class InitializeCurrentOrder implements Action {
  readonly type = OrderActionTypes.InitializeCurrentOrder;
}

export class Load implements Action {
  readonly type = OrderActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = OrderActionTypes.LoadSuccess;

  constructor(public payload: Order[]) {
  }
}

export class LoadFail implements Action {
  readonly type = OrderActionTypes.LoadFail;

  constructor(public payload: string) {
  }
}

export class LoadByCustomerId implements Action {
  readonly type = OrderActionTypes.LoadByCustomerId;

  constructor(public payload: number) {
  }
}

export class LoadByCustomerIdSuccess implements Action {
  readonly type = OrderActionTypes.LoadByCustomerIdSuccess;

  constructor(public payload: Order[]) {
  }
}

export class LoadByCustomerIdFail implements Action {
  readonly type = OrderActionTypes.LoadByCustomerIdFail;

  constructor(public payload: string) {
  }
}

export class UpdateOrder implements Action {
  readonly type = OrderActionTypes.UpdateOrder;

  constructor(public payload: Order) {
  }
}

export class UpdateOrderSuccess implements Action {
  readonly type = OrderActionTypes.UpdateOrderSuccess;

  constructor(public payload: Order) {
  }
}

export class UpdateOrderFail implements Action {
  readonly type = OrderActionTypes.UpdateOrderFail;

  constructor(public payload: string) {
  }
}

export class CreateOrder implements Action {
  readonly type = OrderActionTypes.CreateOrder;

  constructor(public payload: Order) {
  }
}

export class CreateOrderSuccess implements Action {
  readonly type = OrderActionTypes.CreateOrderSuccess;

  constructor(public payload: Order) {
  }
}

export class CreateOrderFail implements Action {
  readonly type = OrderActionTypes.CreateOrderFail;

  constructor(public payload: string) {
  }
}

export class DeleteOrder implements Action {
  readonly type = OrderActionTypes.DeleteOrder;

  constructor(public payload: number) {
  }
}

export class DeleteOrderSuccess implements Action {
  readonly type = OrderActionTypes.DeleteOrderSuccess;

  constructor(public payload: number) {
  }
}

export class DeleteOrderFail implements Action {
  readonly type = OrderActionTypes.DeleteOrderFail;

  constructor(public payload: string) {
  }
}

// Union the valid types
export type OrderActions = SetCurrentOrder
  | ClearCurrentOrder
  | InitializeCurrentOrder
  | Load
  | LoadSuccess
  | LoadFail
  | LoadByCustomerId
  | LoadByCustomerIdSuccess
  | LoadByCustomerIdFail
  | UpdateOrder
  | UpdateOrderSuccess
  | UpdateOrderFail
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderFail
  | DeleteOrder
  | DeleteOrderSuccess
  | DeleteOrderFail;
