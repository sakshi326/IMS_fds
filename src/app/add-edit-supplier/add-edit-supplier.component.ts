import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-add-edit-supplier',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-edit-supplier.component.html',
  styleUrls: ['./add-edit-supplier.component.css'],
})
export class AddEditSupplierComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  message: string = '';
  isEditing: boolean = false;
  supplierId: string | null = null;
  formData: any = {
    name: '',
    address: '',
    contactInfo: '',
    productsProvided: '', // Add productsProvided field here
  };

  ngOnInit(): void {
    this.supplierId = this.router.url.split('/')[2]; // Extracting supplier id from URL
    if (this.supplierId) {
      this.isEditing = true;
      this.fetchSupplier();
    }
  }

  fetchSupplier(): void {
    this.apiService.getSupplierById(this.supplierId!).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.formData = {
            name: res.supplier.name,
            address: res.supplier.address,
            contactInfo: res.supplier.contactInfo, // Retrieve contactInfo
            productsProvided: res.supplier.productsProvided, // Retrieve productsProvided
          };
        }
      },
      error: (error) => {
        this.showMessage(
          error?.error?.message || error?.message || 'Unable to get supplier by id' + error
        );
      },
    });
  }

  // Handle form submission
  handleSubmit() {
    if (!this.formData.name || !this.formData.address || !this.formData.contactInfo || !this.formData.productsProvided) {
      this.showMessage('All fields are necessary');
      return;
    }

    // Prepare data for submission
    const supplierData = {
      name: this.formData.name,
      address: this.formData.address,
      contactInfo: this.formData.contactInfo, // Include contactInfo
      productsProvided: this.formData.productsProvided, // Include productsProvided
    };

    if (this.isEditing) {
      this.apiService.updateSupplier(this.supplierId!, supplierData).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            this.showMessage('Supplier updated successfully');
            this.router.navigate(['/supplier']);
          }
        },
        error: (error) => {
          this.showMessage(error?.error?.message || error?.message || 'Unable to edit supplier' + error);
        },
      });
    } else {
      this.apiService.addSupplier(supplierData).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            this.showMessage('Supplier added successfully');
            this.router.navigate(['/supplier']);
          }
        },
        error: (error) => {
          this.showMessage(error?.error?.message || error?.message || 'Unable to add supplier' + error);
        },
      });
    }
  }

  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 4000);
  }
}
