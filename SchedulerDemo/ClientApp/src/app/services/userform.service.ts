import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userform } from '../models/userform';
import { Time } from '@angular/common';
import { BusinessOwner } from '../models/business-owner';

@Injectable({
  providedIn: 'root'
})
export class UserformService {

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getAll(): Observable<Userform[]>{
    return this.http.get<Userform[]>(`${this.baseUrl}Schedule`);
  }

  getByCity(city:string): Observable<Userform[]>{
    return this.http.get<Userform[]>(`${this.baseUrl}Schedule/${city}`);
  }

  getByLastName(lastName:string): Observable<Userform[]>{
    return this.http.get<Userform[]>(`${this.baseUrl}Schedule/${lastName}`);
  }

  getByDescription(description:string): Observable<Userform[]>{
    return this.http.get<Userform[]>(`${this.baseUrl}Schedule/${description}`);
  }

  // double check this method
  getByDateTime(date:Date, time:Time): Observable<Userform[]>{
    return this.http.get<Userform[]>(`${this.baseUrl}Schedule/filtered?date=${date}&time=${time}`);
  }

  addEvent(e: Userform): Observable<Userform>{
    return this.http.post<Userform>(`${this.baseUrl}Schedule`, e);
  }  

  deleteEvent(id: number): Observable<Userform>{
    return this.http.delete<Userform>(`${this.baseUrl}Schedule/${id}`);
  }

  updateEvent(e: Userform): Observable<Userform>{
    return this.http.patch<Userform>(`${this.baseUrl}Schedule`, e);
  }

  // Business starts here ------------------------------------------------------------------------------------------------
  getOneBusiness(businessGoogleId:string): Observable<BusinessOwner>{
    return this.http.get<BusinessOwner>(`${this.baseUrl}BusinessOwner/owner/${businessGoogleId}`);
  }

  getAllBusiness():Observable<BusinessOwner[]>{
    return this.http.get<BusinessOwner[]>(`${this.baseUrl}BusinessOwner`);
  }

  getByBusinessName(businessGoogleId:string): Observable<Userform[]>{
    return this.http.get<Userform[]>(`${this.baseUrl}BusinessOwner/${businessGoogleId}`);
  }

  addBusinessOwner(b:BusinessOwner): Observable<BusinessOwner>{
    return this.http.post<BusinessOwner>(`${this.baseUrl}BusinessOwner`, b);
  }
  
}
