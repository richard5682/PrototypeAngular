import { HttpParams } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from 'src/app/service/connect/connect.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private connect:ConnectService,private router:Router) { }

  ngOnInit() {
  }
  register(username,password,email){
    var params = new HttpParams()
    .set('username',username)
    .set('password',password)
    .set('email',email);
    this.connect.getRequest('register',params).subscribe(
      data=>{
        console.log(data['result']);
        if(data['result']==1){
          console.log("SUCCESS");
          this.router.navigate(['login','homepage']);
        }
      }
    );
  }
}
