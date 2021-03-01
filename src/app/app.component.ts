import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { LoginService } from './service/connect/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-first-app';
  constructor(private router:Router,private loginService:LoginService){
  }
  ngOnInit(){
    this.router.events.subscribe(
      (evt) => { if((evt instanceof NavigationEnd)){
        return;
      }
      window.scrollTo(0,0);
    })
    this.router.events.subscribe((event)=>
      {if(event instanceof NavigationStart){
        this.loginService.checkLoggedIn();
      }}
    );
    
  }
  
}
