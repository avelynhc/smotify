/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students.
* 
* Name: __Hyunjeong Choi___ Student ID: __143281202__ Date: __2022-07-29____
*
* Angular App (Deployed) Link: _____________________________________________________
*
* User API (Heroku) Link: https://stark-temple-00444.herokuapp.com/api/user
*
********************************************************************************/ 

import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'web422-a4';
  searchString: string = "";
  parameterSub: any;
  public token: any = "";

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService){}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  };

  logout(): void {
    localStorage.clear();
    this.router.navigate(["/login"]);
  };

  handleSearch(): void {
    this.parameterSub = this.route.queryParams.subscribe(params => {
      this.router.navigate(["/search"], {queryParams : {searchString : params["q"]}})
      this.searchString = "";
    });
  };
};
