import { Component, Input, OnInit } from '@angular/core';
import { FetchService } from 'src/app/service/connect/fetch.service';
import { LoginService } from 'src/app/service/connect/login.service';

@Component({
  selector: 'app-providerview',
  templateUrl: './providerview.component.html',
  styleUrls: ['./providerview.component.scss']
})
export class ProviderviewComponent implements OnInit {
  id=0;
  services;
  constructor(private fetch:FetchService,private loginService:LoginService) { 
    
  }

  ngOnInit() {
    this.loginService.notifyLogin().subscribe(
      data=>{
        this.id = this.loginService.loginID;
        this.fetchServices();
      }
    );
  }
  fetchServices(){
    this.fetch.fetchService(null,this.id,null,null).subscribe(
      data => {
        if(data['result']==1){
          this.services = data['services'];
        }
      }
    );
  }
}
