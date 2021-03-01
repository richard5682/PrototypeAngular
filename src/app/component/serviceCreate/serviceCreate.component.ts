import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from 'src/app/service/connect/connect.service';
import { LoginService } from 'src/app/service/connect/login.service';

@Component({
  selector: 'app-serviceCreate',
  templateUrl: './serviceCreate.component.html',
  styleUrls: ['./serviceCreate.component.scss']
})
export class ServiceCreateComponent implements OnInit {
  thumbnailupload=true;
  thumbnail = 'default';
  id=0;
  services=[
    {servicetype:'Cleaning'},
    {servicetype:'Laundry'},
    {servicetype:'Carpentry'},
    {servicetype:'Techinician'},
    {servicetype:'Repair'},
    {servicetype:'Freelancer'},
    {servicetype:'Designer'},
    {servicetype:'Electrical'},
    {servicetype:'Food Service'},
    {servicetype:'Automotive'},
    {servicetype:'Spa'},
    {servicetype:'Beauty Service'},
    {servicetype:'Appliance Installation'},
    {servicetype:'Pets Service'},
    {servicetype:'Pets Vet Service'},
    {servicetype:'Tutorial Service'}
  ];
  constructor(private router:Router, private loginservice:LoginService,private connect:ConnectService) { 
    
  }

  ngOnInit() {
    this.id = this.loginservice.loginID;
  }
  uploadstart(){
    this.thumbnailupload = false;
  }
  thumbnaildone(link){
    this.thumbnailupload = true;
    this.thumbnail = link;
  }
  submit(title:string,desc,contact,type){
    if(title!=null&&desc!=null&&contact!=null&&type!=null){
      if(title.length>0 && desc.length>0,contact.length>0,type.length>0){
        var params = new HttpParams()
        .set('title',title)
        .set('desc',desc)
        .set('contact',contact)
        .set('thumbnail',this.thumbnail)
        .set('type',type)
        .set('id',this.id.toString());
        this.connect.getRequest('registerservice',params).subscribe(
          (data) => {
            if(data['result']==1){
              this.router.navigate(['account','user',this.id]);
            }else if(data['result']==0){
              this.router.navigate(['login','servicecreate']);
            }
          }
        );
      }
    }
  }
}
