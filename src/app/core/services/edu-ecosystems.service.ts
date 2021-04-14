import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { School } from '../models/school';
import { Xinxe } from '../models/xinxe';

@Injectable({
  providedIn: 'root'
})
export class EduEcosystemsService {
  endpoint = environment.db_url + 'api/edu-ecosystems';
  // endpoint = 'api/services';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add School
  AddSchool(data: School): Observable<any> {
    const API_URL = `${this.endpoint}/create`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Update School
  UpdateSchool(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Delete School
  DeleteSchool(id): Observable<any> {
    const API_URL = `${this.endpoint}/delete/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      );
  }


  // Get all School
  GetAllSchools() {
    return this.http.get<School[]>(`${this.endpoint}`);
  }

  // Get Count Xin xe
  GetCountXinxe(): Observable<any> {
    const API_URL = `${this.endpoint}/count-customers`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

    // Get Lists School
    GetListModuleUsedbySchool(): Observable<any> {
      const API_URL = `${this.endpoint}/list-module-used-by-school`;
      return this.http.get(API_URL, { headers: this.headers })
        .pipe(
          map((res: Response) => {
            return res || {};
          }),
          catchError(this.errorMgmt)
        );
    }

  // Get School by Id
  GetSchool(id): Observable<any> {
    const API_URL = `${this.endpoint}/read/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
  }

  // Push Extend vnEdu - SLLLĐT
  pushModuleSLL(id, data): Observable<any> {
    const API_URL = `${this.endpoint}/push-module-edu/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
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
