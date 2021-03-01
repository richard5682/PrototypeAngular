import { HttpParams, HttpResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { ConnectService } from 'src/app/service/connect/connect.service';
import { LoginService } from 'src/app/service/connect/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  subscriber:Subscription;
  redirect:string;
  constructor(private route:ActivatedRoute, private loginservice:LoginService,private router:Router) { 

  }

  ngOnInit() {
    this.redirect = this.route.snapshot.paramMap.get('redirect');
    this.subscriber = this.loginservice.notifyLogin().subscribe(
      data => {
        if(data['result']==1){
          this.router.navigate([this.redirect]);
        }
      }
    );
  }
  ngOnDestroy(){
    this.subscriber.unsubscribe();
  }
  login(username:string,password:string){
    this.loginservice.login(username,password);
    
  }
  routeToRegister(){
    this.router.navigate(['register']);
  }
}
