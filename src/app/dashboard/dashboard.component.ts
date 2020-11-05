import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { Session } from "../services/session";
import { MatToolbarModule } from '@angular/material/toolbar'; 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public authData: any;

  constructor(public authenticate:AuthenticationService) { }

  ngOnInit(): void {
    
  }

}
