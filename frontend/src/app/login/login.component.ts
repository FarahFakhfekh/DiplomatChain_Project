import { Component, OnInit } from '@angular/core';
import { UserService } from "./../user.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userData = { email: '', password: '' };
  constructor(private user: UserService, private router: Router) {}

  ngOnInit() {
    this.user.currentUserData.subscribe(userData => (this.userData = userData));
  }

  changeData(event: { target: { value: any; }; }) {
    var msg = event.target.value;
    this.user.changeData(msg);
  }
  login() {
    const data = {
      name: '', // Provide actual or placeholder data
      phone: '', // Provide actual or placeholder data
      email: this.userData.email,
      password: this.userData.password,
      c_password: '' // Provide actual or placeholder data
    };
    this.user.changeData(data);
  }
  
  redirectToFile() {
    // Redirect to the file page
    this.router.navigate(['file']);
  }
}
