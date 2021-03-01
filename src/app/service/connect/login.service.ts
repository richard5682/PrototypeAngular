import { HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{
  i=0;
  dataresult;
  userLoggedIn:boolean=false;
  loginID:number;
  loginUsername:string;
  subjectlogin = new Subject<any>();
  subjectlogout = new Subject<any>();
  constructor(private connect:ConnectService) { 
    
  }
  ngOnInit(){
    
  }
  login(username,password){
    if(!this.userLoggedIn){
      if(username.length > 0 && password.length > 0){
        var params = new HttpParams().set('username',username).set('password',password);
        this.connect.getRequest('login',params).subscribe(
          (data) => {
            this.dataresult=data;
            if(data['result'] == 1){
            this.userLoggedIn = true;
            this.loginID = data['id'];
            this.loginUsername = data['username'];
            this.subjectlogin.next(this.dataresult);
            }
          },
          (error) => {},
          () => {}
        );
      }
    }
  }
  notifyLogin():Observable<any>{
    return this.subjectlogin.asObservable();
  }
  notifyLogout():Observable<any>{
    return this.subjectlogout.asObservable();
  }
  getlogin():Observable<any>{
    return this.connect.getRequest('getlogin');
  }
  getAccountFrontInfo(id):Observable<any>{
    var params = new HttpParams().set('id',id.toString());
    return this.connect.getRequest('checkexist',params);
  }
  getAllAccount():Observable<any>{
    var params = new HttpParams();
    return this.connect.getRequest('getallaccount',params);
  }
  checkLoggedIn(){
    this.connect.getRequest('getlogin').subscribe(
      (data) => {
        if(data['result'] == 1){
          this.userLoggedIn = true;
          this.loginID = data['id'];
          this.loginUsername = data['username'];
          this.subjectlogin.next(data);
        }else{
          this.logout();
        }
      }
    );
  }
  logout(){
    this.connect.getRequest('logout').subscribe(
      (data)=>{
        if(data['result']==1){
          this.userLoggedIn = false;
          this.loginID =0;
          this.loginUsername = 'GUEST';
          this.subjectlogout.next();
        }
      }
    );
  }
}
