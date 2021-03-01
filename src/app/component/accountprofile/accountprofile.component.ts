import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from 'src/app/service/connect/connect.service';
import { FetchService } from 'src/app/service/connect/fetch.service';
import { LoginService } from 'src/app/service/connect/login.service';

@Component({
  selector: 'app-accountprofile',
  templateUrl: './accountprofile.component.html',
  styleUrls: ['./accountprofile.component.scss']
})
export class AccountprofileComponent implements OnInit {
  domain:string;
  username:string;
  id:number;
  loggedin_id:number;
  profileimage:string;
  showEditProfile:boolean;
  myservice;
  constructor(private loginservice:LoginService,private router:Router,private route:ActivatedRoute, private connect:ConnectService,private fetch:FetchService) { 

  }
  ngOnInit() {
    this.domain = this.connect.domain;
    this.loggedin_id = this.loginservice.loginID;
    this.id = parseInt(this.route.snapshot.paramMap.get('id'),10);
    console.log(this.id);
    this.loginservice.getAccountFrontInfo(this.id).subscribe(
      data => {
        if(data['result'] == 1){
          this.profileimage = data['info']['profileimage'];
          this.username = data['info']['username'];
        }else{
          console.log(data);
          this.router.navigate(['homepage']);
        }
      }
    );
    if(this.loginservice.loginID == this.id){
      this.showEditProfile = true;
    }
    this.fetch.fetchService(null,this.id,null,null).subscribe(
      data => {
        if(data['result'] == 1){
          this.myservice = data['services'];
        }
      }
    );
  }
  gotoconfig(){
    this.router.navigate(['accountconfig']);
  }
}
