import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = {
    userName: "",
    password: "",
    _id: ""
  };
  warning:string = "";
  loading:boolean = false;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm):void {
    if(this.user.userName !== "" && this.user.password !== "") {
      this.loading = true;
      this.auth.login(this.user).subscribe({next: (success) => {
        this.loading = false;
        localStorage.setItem("access_token", success.token);
        this.router.navigate(["/newReleases"]);
      }, error: (e) => {
        this.warning = e.error.message;
        this.loading = false;
      }});
    };
  };
};
