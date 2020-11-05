import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public id: number;
    public name: string;
    public email: string;
    public password?: string;
    private users: any;

  constructor(public authService : AuthenticationService) { }

  ngOnInit(): void {
    /* this.users=this.auth.login(); */
  }

  onLogin(email: string, password?: string){

  }
}
