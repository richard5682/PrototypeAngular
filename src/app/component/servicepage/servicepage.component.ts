import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FetchService } from 'src/app/service/connect/fetch.service';
import { LoginService } from 'src/app/service/connect/login.service';

@Component({
  selector: 'app-servicepage',
  templateUrl: './servicepage.component.html',
  styleUrls: ['./servicepage.component.scss']
})
export class ServicepageComponent implements OnInit, OnDestroy {
  serviceid;
  service;
  owner;
  comments;
  loginid=0;
  subscribelogin : Subscription;
  constructor(private route:ActivatedRoute,private fetch:FetchService
    ,private loginservce:LoginService) { }

  ngOnInit() {
    this.serviceid = this.route.snapshot.paramMap.get('id');
    this.fetch.fetchService(null,null,this.serviceid,1).subscribe(
      data => {
        if(data['result']==1){
          this.service = data['services'][0];
          this.getOwnerInfo();
        }
      }
    );
    this.getComments();
    this.loginservce.checkLoggedIn();
    this.subscribelogin = this.loginservce.notifyLogin().subscribe(
      data => {
        this.loginid = data['id'];
      }
    );
  }
  ngOnDestroy(){
    this.subscribelogin.unsubscribe();
  }
  getOwnerInfo(){
    this.loginservce.getAccountFrontInfo(this.service['owner']).subscribe(
      data => {
        console.log(data);
        if(data['result']==1){
          this.owner=data['info'];
        }
      }
    );
  }
  getComments(){
    this.fetch.fetchComment(this.serviceid).subscribe(
      data => {
        console.log(data);
        if(data['result']==1){
          this.comments = data['comments'];
        }
      }
    );
  }
  addComments(textarea){
    if(textarea != null && textarea.value.length > 0){
      this.fetch.addComment(this.serviceid,this.loginid,textarea.value).subscribe(
        data => {
          if(data['result']==1){
            this.getComments();
          }
        }
      );
      textarea.value = '';
    }
  }
}
