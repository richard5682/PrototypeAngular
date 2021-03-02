import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/connect/login.service';
import { AccountviewComponent } from '../accountview/accountview.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(AccountviewComponent) accview:AccountviewComponent;
  @Output('logoclicked') logoclicked = new EventEmitter();
  router:Router;
  username:string='GUEST';
  LoggedIn:boolean = false;
  loggedinid:number=0;
  constructor(router:Router,private loginservice:LoginService) { 
    this.router = router;
  }

  ngOnInit() {
    this.loginservice.notifyLogin().subscribe(
      data=>{
        if(data['result'] == 1){
          this.LoggedIn = true;
          this.username=data['username'];
          this.loggedinid = data['id'];
          this.accview.refetchinfo(data['id']);
        }
      },
      error => console.log(error)
    );
    this.loginservice.notifyLogout().subscribe(
      data=>{
          this.LoggedIn = false;
          this.username="GUEST";
          this.loggedinid = 0;
          this.accview.refetchinfo(0);
      },
      error => console.log(error)
    );
  }
  logout(){
    this.loginservice.logout();
    this.router.navigate(['homepage']);
  }
  logoClicked(){
    this.logoclicked.emit();
  }
  changeBg(color){
    document.getElementById('wrapper').style.backgroundColor = color;
  }
  changeBorderRad(rad){
    document.getElementById('wrapper').style.borderRadius = rad;
  }
}
