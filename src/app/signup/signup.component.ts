import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import {Item} from './item';
import {Types} from './types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title = 'app';
  radioSel:any;
  radioSelected:string;
  radioSelectedString:string;
  types: Item[] = Types;
  email:string;
  password:string;
  name: string;

  constructor(public authService : AuthenticationService) { 
    this.radioSelected = "administrador";
    this.getSelecteditem(); 
  }

  ngOnInit(): void {
  }

  getSelecteditem(){
    this.radioSel = Types.find(Item => Item.value === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }

  onItemChange(){
    this.getSelecteditem();
  }

}
