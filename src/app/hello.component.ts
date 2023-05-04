import { Component, Input } from '@angular/core';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1> <button type="button" (click)= "clicar()">click</button>`,

  styles: [`h1 { font-family: Lato; }`]
})

export class HelloComponent  {
   @Input() name=" ";
   readonly apiURL! : string;

   constructor(private readonly httpClient: HttpClient,) {
    this.apiURL = '<you api>';
   }

   get<TResult>(
    url: string,
    options: { headers?: HttpHeaders } = {}
  ): Observable<TResult> {
    const { headers } = options;
    return this.httpClient.get<TResult>(url, {headers}).pipe(
      catchError(this.handleError)
    );
  }

   clicar(){
    const headers = new HttpHeaders({'x-client-cert':'cert'})
    this.get(this.apiURL, {headers}).subscribe(res => console.log(res))
    
    console.log(this.name);
    console.log("Testing logs...")
  } 

  private handleError(err: HttpErrorResponse): Observable<never> {
    console.error('Http Handler Service => ', err);

    const { status } = err;

    let message: string = err.message;

    if (err.error?.detail) {
      message = err.error.detail;
    }

    const errorResponse = {
      status,
      message
    }

    return throwError(errorResponse);
  }
}
