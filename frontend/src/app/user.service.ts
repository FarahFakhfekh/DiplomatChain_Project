import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class UserService {
  private userDataSource = new BehaviorSubject({name: '', phone: '', email: '', password: '', c_password: ''});
  currentUserData = this.userDataSource.asObservable();
  constructor() { }
  changeData(newUserData: { name: string; phone: string; email: string; password: string; c_password: string; }) {
    this.userDataSource.next(newUserData)
  }
}