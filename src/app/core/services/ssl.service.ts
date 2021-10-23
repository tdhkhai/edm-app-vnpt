import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SSL } from '../models/ssl';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SSLService {
  endpoint = environment.db_url + 'api/ssl';
  // endpoint = 'api/dau-so';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  // Add SSL
  AddSSL(data: SSL): Observable<any> {
    const API_URL = `${this.endpoint}/create`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get all SSL
  GetAllSSLs() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get SSL by Id
  GetSSL(id): Observable<any> {
    const API_URL = `${this.endpoint}/read/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // Get Count SSL
  GetCountSSL(): Observable<any> {
    const API_URL = `${this.endpoint}/count-customers`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // List Expired
  GetListExpired(): Observable<any> {
    const API_URL = `${this.endpoint}/list-expired`;
    return this.http.get(API_URL)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // List by Status
  GetListbyStatus(data): Observable<any> {
    const API_URL = `${this.endpoint}/list-by-status`;
    return this.http.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // Push Extend SSL
  pushExtendSSL(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/pushextendssl/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Pull Extend SSL
  pullExtendSSL(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/pullextendssl/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Update Status SSL
  updateStatusSSL(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/updatestatus/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Update SSL
  UpdateSSL(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Delete SSL
  DeleteSSL(id): Observable<any> {
    const API_URL = `${this.endpoint}/delete/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
