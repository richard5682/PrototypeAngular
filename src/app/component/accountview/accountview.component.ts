import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from 'src/app/service/connect/connect.service';
import { LoginService } from 'src/app/service/connect/login.service';

@Component({
  selector: 'app-accountview',
  templateUrl: './accountview.component.html',
  styleUrls: ['./accountview.component.scss']
})
export class AccountviewComponent implements OnInit {
  router:Router;
  domain:string;
  @Input() username:string;
  @Input() id:number;
  @Input() header:boolean;
  profileimage;
  constructor(router:Router,private loginservice:LoginService, private connect:ConnectService) { 
    this.router=router;
    
  }

  ngOnInit() {
    this.domain = this.connect.domain;
    this.refetchinfo(this.id);
  }
  refetchinfo(id){
    this.id = id;
    if(this.id != 0){
      this.loginservice.getAccountFrontInfo(id).subscribe(
        (data)=> {
          if(data['result']==1){
            this.profileimage = data['info']['profileimage'];
            this.username = data['info']['username'];
          }
        }
      );
    }else{
      this.profileimage = "default";
      this.username = "GUEST";
    }
  }
  goto_accountpage(){
    if(this.id!=0){
      this.router.navigate(['account',this.username,this.id]);
    }else{
      this.router.navigate(['login','homepage']);
    }
    
  }
}
