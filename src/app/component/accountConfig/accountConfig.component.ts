import { HttpParams } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectService } from 'src/app/service/connect/connect.service';
import { LoginService } from 'src/app/service/connect/login.service';

@Component({
  selector: 'app-accountConfig',
  templateUrl: './accountConfig.component.html',
  styleUrls: ['./accountConfig.component.css']
})
export class AccountConfigComponent implements OnInit{
  
  constructor(private connect:ConnectService, private loginservice:LoginService,private router:Router) { }

  ngOnInit() {
    
    this.loginservice.getlogin().subscribe(
      (data) => {
        if(data['result'] == 1){
          if(this.loginservice.loginID != data['id']){
            this.router.navigate(['homepage']);
          }
        }else{
          this.router.navigate(['homepage']);
        }
      }
    );
  }
  updateProfile(link:string){
    console.log(link);
    var params = new HttpParams().set('profileimage',link);
    this.connect.getRequest('updateprofile',params).subscribe(
      data => {
        if(data['result']==1){

        }else{

        }
      }
    );
  }
}
