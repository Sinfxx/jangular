import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExampleService {
  constructor(private http: HttpClient) {}

  hello() {
    return this.http.get(environment.apiBaseUrl + '/hello');
  }
}
