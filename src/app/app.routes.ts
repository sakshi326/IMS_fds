import { Routes } from '@angular/router';
import { GuardService } from './service/guard.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AddEditSupplierComponent } from './add-edit-supplier/add-edit-supplier.component';
import { ProductComponent } from './product/product.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SellComponent } from './sell/sell.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: '**', redirectTo: 'login' },
  
  

  { path: 'category', component: CategoryComponent },

  { path: 'supplier', component: SupplierComponent },
  { path: 'edit-supplier/:supplierId', component: AddEditSupplierComponent },
  { path: 'add-supplier', component: AddEditSupplierComponent },

  { path: 'product', component: ProductComponent },
  { path: 'edit-product/:productId', component: AddEditProductComponent},
  { path: 'add-product', component: AddEditProductComponent },


  { path: 'purchase', component: PurchaseComponent },
  { path: 'sell', component: SellComponent },

  { path: 'transaction', component: TransactionComponent },
  { path: 'transaction/:transactionId', component: TransactionDetailsComponent },


  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },

//   WIDE CARD
    // {path: "", redirectTo: "/login", pathMatch: 'full'},
    {path: "**", redirectTo: "/dashboard"}

];
