import { Inject, Injectable } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

getById(id: string): Observable <UserInfo>{
  return this.http.get<UserInfo>(`${this.baseUrl}UserInfo/${id}`);
}

newUser(u:UserInfo):Observable<UserInfo>{
  return this.http.post<UserInfo>(`${this.baseUrl}UserInfo`, u);
}

updateUser(u:UserInfo):Observable <UserInfo>{
  return this.http.patch<UserInfo>(`${this.baseUrl}UserInfo`, u);
}


}
