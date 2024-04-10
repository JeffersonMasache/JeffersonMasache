import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestModified = request.clone({
      headers: request.headers.set('authorId', environment.authorId)
    });
    return next.handle(requestModified).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          debugger;
          if (request.method != 'GET') {
            this.toastService.showSuccess('Se ha realizado la acción de manera satisfactoria');
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        debugger;
        if (request.method != 'GET') {
          this.toastService.showError(error.error);
        }
        return throwError(error);
      })
    );;
  }
}
