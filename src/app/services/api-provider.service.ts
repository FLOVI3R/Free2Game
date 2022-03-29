import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {
  token: any;
  id: any;
  actived: any;
  deleted: any;

  apiUrl = 'http://semillero.allsites.es/public/api'

  constructor(private http : HttpClient) { }

  login(user_email: string, user_password: string){
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', {
        email: user_email,
        password: user_password}).subscribe(data =>{
          this.token = data.data.token;
          this.id = data.data.id;
          this.actived = data.data.actived;
          this.deleted = data.data.deleted;

          resolve(data);
          console.log(data);
          err=>{
            console.log(err);
          }
        })
    })
  }

  register(user_firstname: string, user_secondname: string, user_email: string, user_password: string, user_c_password: string){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/register', {
        firstname: user_firstname,
        secondname: user_secondname,
        email: user_email,
        password: user_password,
        c_password: user_c_password}).subscribe(data =>{
          console.log(data);
          resolve(data);
        })
    })
  }
}