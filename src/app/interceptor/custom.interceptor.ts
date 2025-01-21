import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem("Token");
  const clonedReq=req.clone({
    setHeaders:{

      Authorization:`Bearer ${token}`
    }
  })

  return next(clonedReq).pipe(
    catchError(error => {
      console.error("Error in HTTP request", error);
      return throwError(()=>error);
    })
  );
};
