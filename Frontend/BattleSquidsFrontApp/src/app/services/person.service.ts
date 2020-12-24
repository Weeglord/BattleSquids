import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UrlService } from './url.service'
import { Person } from '../models/person'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private loggedUser!: Person;
  private usersUrl: string;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.usersUrl = this.urlService.getUrl() + '/users';
  }

  loginUser(username: string, password: string): Observable<Person> {
    console.log(this.usersUrl);
    if (username && password) {
      const queryParams = `?user=${username}&pass=${password}`;
      return this.http.put(this.usersUrl + queryParams,
        {withCredentials:true}).pipe(
          map(resp => resp as Person)
      );
    } else {
      return this.http.get(this.usersUrl,
        {withCredentials:true}).pipe(
          map(resp => resp as Person)
        );
    }
  }

  logoutUser(): Observable<object> {
    return this.http.delete(this.usersUrl, {withCredentials:true}).pipe();
  }

  updateUser(updatedUser: Person): Observable<object> {
    this.loggedUser = updatedUser;
    return this.http.put(this.usersUrl + this.loggedUser.id, updatedUser, 
      {withCredentials:true}).pipe();
  }

  getLoggedUser(): Person {
    return this.loggedUser;
  }

  registerUser(newUser: Person) {
  }
}
