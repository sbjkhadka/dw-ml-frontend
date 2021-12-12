import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  predictFromClassificationAlgorithm(payload: any): Observable<any> {
    return this.http.post<any>(`${environment.base_url}tree`, payload).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  predictFromRegressionAlgorithm(payload: any): Observable<any> {
    return this.http.post<any>(`${environment.base_url}regression`, payload).pipe(catchError(error => {
      return throwError(error);
    }));
  }
}
