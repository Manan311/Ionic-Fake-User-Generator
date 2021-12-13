import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultResponse } from './models/ResultResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  url = 'https://randomuser.me/api/';

  constructor(
    private http: HttpClient
  ) { }

  getServiceUser(): Observable<ResultResponse> {
    // eslint-disable-next-line @typescript-eslint/quotes
    return this.http.get<ResultResponse>(this.url + "?password=special,upper,lower,number,16-16");
  }
}
