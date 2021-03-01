import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from 'src/app/service/connect/fetch.service';

@Component({
  selector: 'app-serviceListPage',
  templateUrl: './serviceListPage.component.html',
  styleUrls: ['./serviceListPage.component.scss']
})
export class ServiceListPageComponent implements OnInit {
  type;
  services;
  constructor(private actroute:ActivatedRoute,private fetch:FetchService) { }

  ngOnInit() {
    this.type = this.actroute.snapshot.paramMap.get('type');
    this.fetch.fetchService(this.type,null,null,null).subscribe(
      data => {
        if(data['result']==1){
          this.services = data['services'];
        }
      }
    );
  }

}
