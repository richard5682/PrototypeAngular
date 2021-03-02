import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceclickedService {
  serviceclicked = new Subject;
  constructor() { }
  notifyOnServiceClicked() :Observable<any>{
    return this.serviceclicked.asObservable();
  }
}
