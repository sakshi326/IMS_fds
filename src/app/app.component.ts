import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { ApiService } from './service/api.service';
import { Token } from '@angular/compiler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { customInterceptor } from './interceptor/custom.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useValue:customInterceptor,
  }]
})


export class AppComponent {
  title = 'ims';
  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


isAuth():boolean{
  console.log("Entering isAuth")
  return this.apiService.isAuthenticated();
}

isAdmin():boolean{
  console.log(this.apiService.isAdmin())
  return this.apiService.isAdmin();
}



logOut():void{
  localStorage.removeItem("Token")
  this.apiService.logout();
  this.router.navigate(["/login"])
  this.cdr.detectChanges();
}





}
