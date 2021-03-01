import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private connect:ConnectService) { }

  fetchService(type:string,owner:number,serviceid:number,limit:number):Observable<any>{
    var params = new HttpParams();
    if(type!=null){
      params = params.set('type',type);
    }else{
      params = params.set('type','');
    }
    if(serviceid!=null){
      params = params.set('serviceid',serviceid.toString());
    }else{
      params = params.set('serviceid','');
    }
    if(owner!=null){
      params = params.set('owner',owner.toString());
    }else{
      params = params.set('owner','');
    }
    if(limit!=null){
      params = params.set('limit',limit.toString());
    }else{
      params = params.set('limit','');
    }
    return this.connect.getRequest('selectservice',params);
  }
  fetchComment(serviceid:number):Observable<any>{
    var params = new HttpParams()
    .set('serviceid',serviceid.toString());
    return this.connect.getRequest('getcomment',params);
  }
  addComment(serviceid:number,ownerid:number,comment:string){
    var params = new HttpParams()
    .set('serviceid',serviceid.toString())
    .set('userid',ownerid.toString())
    .set('comment',comment);
    return this.connect.getRequest('addcomment',params);
  }
}
