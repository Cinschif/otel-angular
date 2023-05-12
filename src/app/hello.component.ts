import { Component, Input } from '@angular/core';
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
    this.apiURL = "https://localhost:44300/api/Person";
   }

   get<TResult>(
    url: string,
     ): Observable<TResult> {
        return this.httpClient.get<TResult>(url,).pipe(
      catchError(this.handleError)
    );
  }

   clicar(){
       this.get(this.apiURL).subscribe(res => console.log(res))
    
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
