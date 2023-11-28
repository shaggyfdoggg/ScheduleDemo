import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

getAllServices ():Observable<Service[]>{
  return this.http.get<Service[]>(`${this.baseUrl}Service`);
}
getServicesByBusinessId(businessId:string): Observable<Service[]>{
  return this.http.get<Service[]>(`${this.baseUrl}Service/${businessId}`);
}

getSingleService(id: number):Observable <Service>{
  return this.http.get<Service>(`${this.baseUrl}Service/Single/${id}`)
}

addService(service:Service):Observable<Service>{
  return this.http.post<Service>(`${this.baseUrl}Service`, service);
}

deleteService(Id: number): Observable<Service>{
  return this.http.delete<Service>(`${this.baseUrl}Service/${Id}`);
}

}
