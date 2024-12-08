import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem("Token");
  console.log(token)
  const clonedReq=req.clone({
    setHeaders:{
      Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW5pc2hhQGdtYWlsLmNvbSIsImlhdCI6MTczMzY3MDcwOSwiZXhwIjoxNzMzNjc0MzA5fQ.OdiZ4ywVk72ct4mrIpM4vLV6wqC4oUEEmvnGetAtWWg`
      
      // Authorization:`${token}`

    }
  })
  console.log("Tooken"+token)

  return next(clonedReq).pipe(
    catchError(error => {
      console.error("Error in HTTP request", error);
      return throwError(()=>error);
    })
  );
};
