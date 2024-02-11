import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getHelloWorld(): Observable<any> {
    return this.http.get('https://us-central1-node-deploy-23b01.cloudfunctions.net/app', { responseType: 'text' });
  }
}
