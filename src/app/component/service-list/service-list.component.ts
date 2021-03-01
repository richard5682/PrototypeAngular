import { Component, Input, OnInit } from '@angular/core';
import { FetchService } from 'src/app/service/connect/fetch.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  @Input() servicetype:string;
  @Input() maxnumber:number;
  services;
  constructor(private fetch:FetchService) { }

  ngOnInit() {
    this.fetch.fetchService(this.servicetype,null,null,this.maxnumber).subscribe(
      data => {
        if(data['result'] == 1){
          this.services = data['services'];
        }
      }
    );
  }
  
}
