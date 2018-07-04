import {Customer} from '../customer';

/* NgRx */
import {Action} from '@ngrx/store';

export enum CustomerActionTypes {
  SetCurrentCustomer = '[Customer] Set Current Customer',
  ClearCurrentCustomer = '[Customer] Clear Current Customer',
  InitializeCurrentCustomer = '[Customer] Initialize Current Customer',
  Load = '[Customer] Load',
  LoadSuccess = '[Customer] Load Success',
  LoadFail = '[Customer] Load Fail',
  UpdateCustomer = '[Customer] Update Customer',
  UpdateCustomerSuccess = '[Customer] Update Customer Success',
  UpdateCustomerFail = '[Customer] Update Customer Fail',
  CreateCustomer = '[Customer] Create Customer',
  CreateCustomerSuccess = '[Customer] Create Customer Success',
  CreateCustomerFail = '[Customer] Create Customer Fail',
  DeleteCustomer = '[Customer] Delete Customer',
  DeleteCustomerSuccess = '[Customer] Delete Customer Success',
  DeleteCustomerFail = '[Customer] Delete Customer Fail'
}

// Action Creators
export class SetCurrentCustomer implements Action {
  readonly type = CustomerActionTypes.SetCurrentCustomer;

  constructor(public payload: Customer) {
  }
}

export class ClearCurrentCustomer implements Action {
  readonly type = CustomerActionTypes.ClearCurrentCustomer;
}

export class InitializeCurrentCustomer implements Action {
  readonly type = CustomerActionTypes.InitializeCurrentCustomer;
}

export class Load implements Action {
  readonly type = CustomerActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CustomerActionTypes.LoadSuccess;

  constructor(public payload: Customer[]) {
  }
}

export class LoadFail implements Action {
  readonly type = CustomerActionTypes.LoadFail;

  constructor(public payload: string) {
  }
}

export class UpdateCustomer implements Action {
  readonly type = CustomerActionTypes.UpdateCustomer;

  constructor(public payload: Customer) {
  }
}

export class UpdateCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.UpdateCustomerSuccess;

  constructor(public payload: Customer) {
  }
}

export class UpdateCustomerFail implements Action {
  readonly type = CustomerActionTypes.UpdateCustomerFail;

  constructor(public payload: string) {
  }
}

export class CreateCustomer implements Action {
  readonly type = CustomerActionTypes.CreateCustomer;

  constructor(public payload: Customer) {
  }
}

export class CreateCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.CreateCustomerSuccess;

  constructor(public payload: Customer) {
  }
}

export class CreateCustomerFail implements Action {
  readonly type = CustomerActionTypes.CreateCustomerFail;

  constructor(public payload: string) {
  }
}

export class DeleteCustomer implements Action {
  readonly type = CustomerActionTypes.DeleteCustomer;

  constructor(public payload: number) {
  }
}

export class DeleteCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.DeleteCustomerSuccess;

  constructor(public payload: number) {
  }
}

export class DeleteCustomerFail implements Action {
  readonly type = CustomerActionTypes.DeleteCustomerFail;

  constructor(public payload: string) {
  }
}

// Union the valid types
export type CustomerActions = SetCurrentCustomer
  | ClearCurrentCustomer
  | InitializeCurrentCustomer
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateCustomer
  | UpdateCustomerSuccess
  | UpdateCustomerFail
  | CreateCustomer
  | CreateCustomerSuccess
  | CreateCustomerFail
  | DeleteCustomer
  | DeleteCustomerSuccess
  | DeleteCustomerFail;
