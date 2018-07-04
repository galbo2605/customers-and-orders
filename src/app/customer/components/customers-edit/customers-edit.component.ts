import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Customer} from '../../customer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenericValidator} from '../../../shared/generic-validator';

@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.component.html',
  styleUrls: ['./customers-edit.component.css']
})
export class CustomersEditComponent implements OnInit, OnChanges, OnDestroy {
  pageTitle = 'Customer Edit';
  @Input() errorMessage: string;
  @Input() selectedCustomer: Customer;
  @Output() create = new EventEmitter<Customer>();
  @Output() update = new EventEmitter<Customer>();
  @Output() delete = new EventEmitter<Customer>();
  @Output() clearCurrent = new EventEmitter<void>();

  componentActive = true;
  customerForm: FormGroup;

  customer: Customer | null;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      customerName: {
        required: 'Customer name is required.',
        minlength: 'Customer name must be at least three characters.',
        maxlength: 'Customer name cannot exceed 50 characters.'
      },
      customerEmail: {
        required: 'Email Address is required.',
        email: 'Please enter a valid email address.'
      },
      country: {
        required: 'Country is required.',
      },
      city: {
        required: 'City is required.',
      },
      street: {
        required: 'Street is required.',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.customerForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      customerEmail: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
    });

    // Watch for value changes
    this.customerForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.customerForm)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {

    // patch form with value from the store
    if (changes.selectedCustomer) {
      const customer: any = changes.selectedCustomer.currentValue as Customer;
      this.displayCustomer(customer);
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
    this.clearCurrent.emit();
  }

  displayCustomer(customer: Customer | null): void {
    // Set the local customer property
    this.customer = customer;

    if (this.customer) {
      // Reset the form back to pristine
      this.customerForm.reset();

      // Display the appropriate page title
      if (this.customer.id === 0) {
        this.pageTitle = 'Add Customer';
      } else {
        this.pageTitle = `Edit: ${this.customer.customerName}`;
      }

      // Update the data on the form
      this.customerForm.patchValue({
        customerName: this.customer.customerName,
        customerEmail: this.customer.customerEmail,
        country: this.customer.country,
        city: this.customer.city,
        street: this.customer.street,
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected customer
    // replacing any edits made
    this.displayCustomer(this.customer);
  }

  deleteCustomer(): void {
    if (this.customer && this.customer.id) {
      if (confirm(`Really delete the customer: ${this.customer.customerName}?`)) {
        this.delete.emit(this.customer);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      if (this.customerForm.dirty) {
        // Copy over all of the original customer properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const c = {...this.customer, ...this.customerForm.value};

        if (c.id === 0) {
          this.create.emit(c);
        } else {
          this.update.emit(c);
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
}
