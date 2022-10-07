import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AlertifyService } from "./alertify.service";

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptorService implements HttpInterceptor{

  constructor(private alertify: AlertifyService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('HTTP Request started');
    return next.handle(request)
      .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            this.alertify.error(error.error);
            return throwError(() => new Error('Error'));
          })
      );
  }

  }
