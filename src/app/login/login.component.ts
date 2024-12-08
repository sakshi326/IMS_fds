import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  formData: any = {
    email: '',
    password: '',
  };

  message: string | null = null;

  async handleSubmit() {
    if (!this.formData.email || !this.formData.password) {
      this.showMessage('All fields are required');
      return;
    }

    try {
      const response: any = await firstValueFrom(
        this.apiService.loginUser(this.formData)
      );
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem('Token', JSON.stringify(response.token));

        // Role-based navigation
        this.apiService.loginUser(this.formData).subscribe(
          () => {
            const role = this.apiService.getRole();
            if (role === 'USER') {
              this.router.navigate(['/dashboard']);
            } else if (role === 'MANAGER') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          },
          (error) => {
            console.error('Login error:', error);
          }
        );
      }
    } catch (error: any) {
      console.log(error);
      this.showMessage(
        error?.error?.message ||
          error?.message ||
          'Unable to Login a user' + error
      );
    }
  }

  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, 4000);
  }
}
