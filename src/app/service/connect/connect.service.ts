import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService{
  domain = 'gjtestingsite.000webhostapp.com';
  root = "https://"+this.domain+"/lib/";

  //  domain = 'localhost';
  //  root = "http://"+this.domain+"/lib/";

  phpfile = Array();
  
  constructor(private http:HttpClient) { 
    this.phpfile['login'] = 'login.php';
    this.phpfile['register'] = 'register.php';
    this.phpfile['getlogin'] = 'GetLogin.php';
    this.phpfile['logout'] = 'logout.php';
    this.phpfile['imageupload'] = 'imageupload.php';
    this.phpfile['checkexist'] = 'checkExist.php';
    this.phpfile['updateprofile'] = 'updateProfile.php';
    this.phpfile['registerservice'] = 'registerservice.php';
    this.phpfile['selectservice'] = 'selectservice.php';
    this.phpfile['getallaccount'] = 'getAllAccount.php';
    this.phpfile['getcomment'] = 'getComment.php';
    this.phpfile['addcomment'] = 'addComment.php';
  }

  getRequest(file:string,parameter?:HttpParams):Observable<any>{
    var url = this.root+this.phpfile[file];
    if(parameter == null){
      console.log(url);
      return this.http.get(url);
    }else{
      return this.http.get(url,{params:parameter});
    } 
  }
  postRequest(file:string,parameter:HttpParams):Observable<any>{
    var body = parameter.toString();
    var url = this.root+this.phpfile[file];
    var header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    return this.http.post(url,body,{headers:header});
  }
}
