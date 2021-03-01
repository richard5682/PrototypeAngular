import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from 'src/app/service/connect/connect.service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {
  domain;
  @Input() service;
  title;
  id;
  thumbnail;
  router:Router;
  constructor(router:Router,connect:ConnectService) { 
    this.domain = connect.domain;
    this.router=router;
  }

  ngOnInit() {
    this.title = this.service['title'];
    this.id = this.service['id'];
    this.thumbnail = this.service['thumbnail'];
  }

}
