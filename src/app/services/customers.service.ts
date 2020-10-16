import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICustomer } from '../domain/icustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private url: string = environment.URL;

  constructor(private http: HttpClient) {}  // Constructor Injector

  public getAllCustomers(): Observable<ICustomer[]> {

    return this.http.get<ICustomer[]>(this.url);

   }

   public getCustomersByNameContaining(part: string) : Observable<ICustomer[]> {

    const myparams = new HttpParams().set('namePart', part);
    const myheaders = new HttpHeaders().set('accept', 'application/json'); //Not necessary for our App
    const options = {params : myparams, headers : myheaders};

    return this.http.get<ICustomer[]>(this.url, options); // Retourne ceci -> customers?namePart=AZERT

   }

}
