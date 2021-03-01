import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/connect/login.service';

@Component({
  selector: 'app-accountList',
  templateUrl: './accountList.component.html',
  styleUrls: ['./accountList.component.scss']
})
export class AccountListComponent implements OnInit {
  accounts;
  constructor(private loginservice:LoginService) { }

  ngOnInit() {
    this.loginservice.getAllAccount().subscribe(
      data => {
        if(data['result'] == 1){
          this.accounts = data['account'];
        }
      }
    );
  }

}
