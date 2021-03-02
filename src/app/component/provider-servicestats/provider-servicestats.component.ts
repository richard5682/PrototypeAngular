import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-servicestats',
  templateUrl: './provider-servicestats.component.html',
  styleUrls: ['./provider-servicestats.component.scss']
})
export class ProviderServicestatsComponent implements OnInit {
  @Input() Service;
  constructor() { }

  ngOnInit() {
  }

}
