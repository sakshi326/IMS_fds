import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import CryptoJS from "crypto-js";
import { Token } from '@angular/compiler';



@Injectable({
  providedIn: 'root',
})


export class ApiService {

  authStatuschanged = new EventEmitter<void>();
  private static BASE_URL = 'http://localhost:8081/api';
  private static ENCRYPTION_KEY = "phegon-dev-inventory";


  constructor(private http: HttpClient) {}

    // Encrypt data and save to localStorage
    encryptAndSaveToStorage(key: string, value: string): void {
      const encryptedValue = CryptoJS.AES.encrypt(value, ApiService.ENCRYPTION_KEY).toString();
      localStorage.setItem(key, encryptedValue);
    }
  
    // Retreive from localStorage and Decrypt
    // private getFromStorageAndDecrypt(key: string): any {
    //   try {
    //     const encryptedValue = localStorage.getItem(key);
    //     console.log(encryptedValue)
    //     console.log(!encryptedValue)
    //     if (!encryptedValue) return null;
    //     return CryptoJS.AES.decrypt(encryptedValue, ApiService.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
    //   } catch (error) {
    //     return null;
    //   }
    // }

    getRole(): string | null {
      return this.getFromStorageAndDecrypt("role");
    }
    
    private getFromStorageAndDecrypt(key: string): any {
      try {
        const encryptedValue = localStorage.getItem(key);
        return encryptedValue;
      } catch (error) {
        return null;
      }
    }
    
  private clearAuth() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
  }



  private getHeader(): HttpHeaders {
    const token = this.getFromStorageAndDecrypt("token");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW5pc2hhQGdtYWlsLmNvbSIsImlhdCI6MTczMzY3MDcwOSwiZXhwIjoxNzMzNjc0MzA5fQ.OdiZ4ywVk72ct4mrIpM4vLV6wqC4oUEEmvnGetAtWWg`,
    });
  }







  /***AUTH & USERS API METHODS */

  registerUser(body: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/auth/signup`, body);
  }

  loginUser(body: any): Observable<any> {
    console.log("tried logging in");
    
    return this.http.post(`${ApiService.BASE_URL}/auth/login`, body).pipe(
      tap((response: any) => {
        console.log(response);
        
        this.encryptAndSaveToStorage("token", response.token);
        console.log(response.token)
        localStorage.setItem("role", response.role);
        this.authStatuschanged.emit();
      })
    );
  }
  

  getLoggedInUserInfo(): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/auth/current`, {
      headers: this.getHeader(),
    });
  }









  /**CATEGOTY ENDPOINTS */
  // createCategory(body: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //      'Content-Type': 'application/json',
  //      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW5pc2hhQGdtYWlsLmNvbSIsImlhdCI6MTczMzYzNTUyMCwiZXhwIjoxNzMzNjM5MTIwfQ.U8FON6-KG2HXP1vBBTRYaUWN4rfwtslj-Owt92mqxoE'
  //     }),
  //    withCredentials: true
  //   };
  //   return this.http.post(`${ApiService.BASE_URL}/categories/add`,body, httpOptions)
  //     // headers: this.getHeader(),
  
  // }
  createCategory(body: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/categories/add`, body, {
      headers: this.getHeader(),
    });
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/categories/all`, {
      headers: this.getHeader(),
    });
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/categories/${id}`, {
      headers: this.getHeader(),
    });
  }

  updateCategory(id: string, body: any): Observable<any> {
    return this.http.put(
      `${ApiService.BASE_URL}/categories/update/${id}`,
      body,
      {
        headers: this.getHeader(),
      }
    );
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${ApiService.BASE_URL}/categories/delete/${id}`, {
      headers: this.getHeader(),
    });
  }






  /** SUPPLIER API */
  addSupplier(body: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/suppliers/add`, body, {
      headers: this.getHeader(),
    });
  }

  getAllSuppliers(): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/suppliers/all`, {
      headers: this.getHeader(),
    });
  }

  getSupplierById(id: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/suppliers/${id}`, {
      headers: this.getHeader(),
    });
  }

  updateSupplier(id: string, body: any): Observable<any> {
    return this.http.put(
      `${ApiService.BASE_URL}/suppliers/update/${id}`,
      body,
      {
        headers: this.getHeader(),
      }
    );
  }

  deleteSupplier(id: string): Observable<any> {
    return this.http.delete(`${ApiService.BASE_URL}/suppliers/delete/${id}`, {
      headers: this.getHeader(),
    });
  }







  /**PRODUICTS ENDPOINTS */
  addProduct(formData: any): Observable<any> {
    console.log(formData)
    return this.http.post(`${ApiService.BASE_URL}/products/add`, formData, {
      headers: this.getHeader(),
    });
  }

  updateProduct(formData: any): Observable<any> {
    return this.http.put(`${ApiService.BASE_URL}/products/update`, formData, {
      headers: this.getHeader(),
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/products/all`, {
      headers: this.getHeader(),
    });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/products/${id}`, {
      headers: this.getHeader(),
    });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${ApiService.BASE_URL}/products/delete/${id}`, {
      headers: this.getHeader(),
    });
  }








  /**Transactions Endpoints */

  purchaseProduct(body: any): Observable<any> {
    return this.http.post(
      `${ApiService.BASE_URL}/transactions/purchase`,
      body,
      {
        headers: this.getHeader(),
      }
    );
  }

  sellProduct(body: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/transactions/sell`, body, {
      headers: this.getHeader(),
    });
  }

  getAllTransactions(searchText: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/transactions/all`, {
      params: { searchText: searchText },
      headers: this.getHeader(),
    });
  }

  getTransactionById(id: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/transactions/${id}`, {
      headers: this.getHeader(),
    });
  }

  
  updateTransactionStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${ApiService.BASE_URL}/transactions/update/${id}`, JSON.stringify(status), {
      headers: this.getHeader().set("Content-Type", "application/json")
    });
  }


  getTransactionsByMonthAndYear(month: number, year: number): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/transactions/by-month-year`, {
      headers: this.getHeader(),
      params: {
        month: month,
        year: year,
      },
    });
  }












/**AUTHENTICATION CHECKER */
    
  logout():void{
    this.clearAuth()
  }

  isAuthenticated():boolean{
    const token = this.getFromStorageAndDecrypt("Token");
    console.log(token)
    return token;
  }

  isAdmin():boolean {
    const role = this.getFromStorageAndDecrypt("role"); 
    // const role=localStorage.
    return role === "MANAGER";
  }

}