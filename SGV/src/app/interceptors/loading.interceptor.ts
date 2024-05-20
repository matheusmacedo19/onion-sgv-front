import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Observable, finalize } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class loadingInterceptor implements HttpInterceptor{
  private activeRequests = 0;
  constructor(private loadingService : LoadingService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(this.activeRequests == 0){
      this.loadingService.show();
    }
    
    this.activeRequests++;

    return next.handle(req).pipe(
      finalize(() =>{
        this.activeRequests--;

        if(this.activeRequests==0){
          this.loadingService.hide();
        }
      })
    );
  } 
}


