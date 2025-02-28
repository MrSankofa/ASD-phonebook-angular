import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import {Contact} from "../contacts/contact";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient) {}

  loadAll() {
    return this.http.get<Contact[]>(this.serverUrl, httpOptions)
        .pipe(catchError(this.handleError));
  }

  postContact(contact: Contact) {
    return this.http.post<Contact>(this.serverUrl, contact, httpOptions)
        .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
}
