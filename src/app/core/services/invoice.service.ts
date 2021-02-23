import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Invoice } from '../models/vnpt-invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  endpoint = 'http://localhost:4000/api/invoices';
  // endpoint = 'api/invoices';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add Invoice
  AddInvoice(data: Invoice): Observable<any> {
    const API_URL = `${this.endpoint}/create`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get all Invoices
  GetInvoices() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get all Invoices
  GetInvoicesActivated() {
    return this.http.get(`${this.endpoint}/activatedInvoice`);
  }

  // Get all Invoices by Date
  GetInvoicesByDate() {
    return this.http.get(`${this.endpoint}/getinvoicesbydate`);
  }

  // Get Count Invoice
  GetCountInvoice(): Observable<any> {
    const API_URL = `${this.endpoint}/count-customers`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // Get Count Invoice for Line Chart
  GetCountInvoiceForLineChart(): Observable<any> {
    const API_URL = `${this.endpoint}/count-customers-line-chart`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // Doanh thu hàng tháng
  GetMonthlyIncome(data): Observable<any> {
    const API_URL = `${this.endpoint}/monthly-revenue`;
    return this.http.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // List Invoice by Status
  GetListInvoicebyStatus(data): Observable<any> {
    const API_URL = `${this.endpoint}/list-invoice-by-status`;
    return this.http.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // List Invoice by ComTaxCode
  GetListInvoiceByComTaxCode(data): Observable<any> {
    const API_URL = `${this.endpoint}/list-invoice-by-com-tax-code`;
    return this.http.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }


  // Get Invoice by Id
  GetInvoice(id): Observable<any> {
    const API_URL = `${this.endpoint}/read/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // Update Invoice
  UpdateInvoice(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Delete Invoice
  DeleteInvoice(id): Observable<any> {
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

  // Sumary theo thang
  sumaryTheoThang(data: any) {

    const API_URL = `${this.endpoint}/sumary-theo-thang`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // Sumary theo thang - AM
  sumaryTheoThangAM(data: any) {

    const API_URL = `${this.endpoint}/sumary-theo-thang-am`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // CountSitebyUnit
  CountSitebyUnit(data: any) {

    const API_URL = `${this.endpoint}/count-site-by-unit`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // CountSitebyAM
  CountSitebyAM(data: any) {

    const API_URL = `${this.endpoint}/count-site-by-am`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // So lieu Site - AM
  dataOfSitesAM(data: any) {

    const API_URL = `${this.endpoint}/so-lieu-site-am`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // So lieu Site - AM
  dataOfSitesDonVi(data: any) {

    const API_URL = `${this.endpoint}/so-lieu-site-don-vi`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }
}
