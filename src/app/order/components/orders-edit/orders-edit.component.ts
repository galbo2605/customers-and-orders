import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../order';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenericValidator} from '../../../shared/generic-validator';
import {NumberValidators} from '../../../shared/number.validator';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css']
})
export class OrdersEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Order Edit';

  componentActive = true;
  orderForm: FormGroup;
  isValidAndDirty = false;

  order: Order | null;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<OrdersEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any | null) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      orderName: {
        required: 'Order name is required.',
        minlength: 'Order name must be at least three characters.',
        maxlength: 'Order name cannot exceed 50 characters.'
      },
      orderNumber: {
        required: 'Order number is required.',
        pattern: 'Order number must be a number',
      },
      starRating: {
        range: 'Rate the order between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.order = this.data;
    // Define the form group
    this.orderForm = this.fb.group({
      orderName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      orderNumber: ['', [Validators.required]],
      starRating: ['', NumberValidators.range(1, 5)],
      customerId: '',
      description: ''
    });

    // Watch for value changes
    this.orderForm.valueChanges.subscribe(
      () => {
        this.displayMessage = this.genericValidator.processMessages(this.orderForm);
        if (this.orderForm.dirty) {
          this.orderForm.valid ? this.isValidAndDirty = true : this.isValidAndDirty = false;
        }
      }
    );
    this.displayOrder(this.order);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
    this.data = {type: 'clearCurrent', order: {...this.order}};
  }

  displayOrder(order: Order | null): void {
    // Set the local order property
    this.order = order;

    if (this.order) {
      // Reset the form back to pristine
      this.orderForm.reset();

      // Display the appropriate page title
      if (this.order.id === 0) {
        this.pageTitle = 'Add Order';
      } else {
        this.pageTitle = `Edit: ${this.order.orderName}`;
      }

      // Update the data on the form
      this.orderForm.patchValue({
        orderName: this.order.orderName,
        orderNumber: this.order.orderNumber,
        starRating: this.order.starRating,
        customerId: this.order.customerId,
        description: this.order.description
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected order
    // replacing any edits made
    this.displayOrder(this.order);
  }

  deleteOrder(): void {
    if (this.order && this.order.id) {
      if (confirm(`Really delete the order: ${this.order.orderName}?`)) {
        this.data = {type: 'delete', order: {...this.order}};
      }
    } else {
      // No need to delete, it was never saved
      this.data = {type: 'clearCurrent', order: {...this.order}};
    }
    this.dialogRef.close(this.data);
  }

  saveOrder(): void {
    // if (this.orderForm.valid) {
    if (this.isValidAndDirty) {
      // Copy over all of the original order properties
      // Then copy over the values from the form
      // This ensures values not on the form, such as the Id, are retained
      const o = {...this.order, ...this.orderForm.value};
      if (o.id === 0) {
        this.data = {type: 'create', order: {...o}};
      } else {
        this.data = {type: 'update', order: {...o}};
      }
      this.dialogRef.close(this.data);
    }
    // }
  }

  onClose(): void {
    this.dialogRef.close(this.data);
  }
}
