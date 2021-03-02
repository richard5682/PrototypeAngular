import { Component, HostListener, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { LoginService } from './service/connect/login.service';
import { ServiceclickedService } from './service/serviceclicked.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-first-app';
  loggedinid=0;
  @ViewChild(HeaderComponent) appheader:HeaderComponent;
  constructor(private router:Router,private loginService:LoginService,private serviceclicked:ServiceclickedService){
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
    this.loginService.notifyLogin().subscribe(
      data => {
        this.loggedinid = this.loginService.loginID;
      }
    );
    this.loginService.notifyLogout().subscribe(
      data => {
        this.loggedinid = 0;
      }
    );
    this.serviceclicked.notifyOnServiceClicked().subscribe(
      data => {
        this.headerClick(true);
      }
    );
  }
  serviceview:boolean = true;

  heightc = 90;
  deltatime = 10;
  deltaspeed = 0.1;
  
  headerClick(close?:boolean){
    //#00C851
    if(close!=null){
      if(close){
        this.doserviceview();
      }else{
        this.doproviderview();
      }
    }else{
      if(this.loggedinid != 0){
        if(this.serviceview){
          
          this.doproviderview();
        }else{
          this.doserviceview();
        }
      } 
    }
    
  }
  doproviderview(instant?){
    if(instant == null){
      document.getElementById('header').style.transition='1s';
     
    }else{
      if(instant){
        document.getElementById('header').style.transition='0s'
      }else{
        document.getElementById('header').style.transition='1s'
      }
    }
    var height = window.innerHeight;
    document.getElementById('header').style.position="fixed";
    document.getElementById('header').style.top=height-this.heightc+'px';
    document.getElementById('providerview').style.height="100%";
    this.appheader.changeBg('#007E33');
    this.serviceview = false;
  }
  doserviceview(){
    document.getElementById('header').style.transition='1s';
    document.getElementById('header').style.position="fixed";
    document.getElementById('header').style.top="0em";
    document.getElementById('providerview').style.height="0%";
    this.appheader.changeBg('chocolate');
    this.serviceview = true;
  }
  @HostListener('window:resize',['$event'])
  onResize(event){
    if(this.serviceview){
      this.doserviceview();
    }else{
      this.doproviderview(true);
    }
  }
}
