import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IDC } from '../models/IDC';

@Injectable({
  providedIn: 'root'
})
export class IDCService {
  endpoint = 'http://localhost:4000/api/idc';
  // endpoint = 'api/dau-so';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  // Add IDC
  AddIDC(data: IDC): Observable<any> {
    const API_URL = `${this.endpoint}/create`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get all IDC
  GetAllIDCs() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get IDC by Id
  GetIDC(id): Observable<any> {
    const API_URL = `${this.endpoint}/read/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // Get Count IDC
  GetCountIDC(): Observable<any> {
    const API_URL = `${this.endpoint}/count-customers`;
    return this.http.get(API_URL, { headers: this.headers })
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


  // Update IDC
  UpdateIDC(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Push Extend IDC
  pushExtendIDC(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/pushextendidc/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Pull Extend IDC
  pullExtendIDC(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/pullextendidc/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Update Status IDC
  updateStatusIDC(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/updatestatus/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Delete IDC
  DeleteIDC(id): Observable<any> {
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
