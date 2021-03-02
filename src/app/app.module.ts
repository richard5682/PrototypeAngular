import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material/material.module';
import { HeaderComponent } from './component/header/header.component';
import { AccountviewComponent } from './component/accountview/accountview.component';
import { BillboardComponent } from './component/billboard/billboard.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { ServiceCardComponent } from './component/service-card/service-card.component';
import { ServiceListComponent } from './component/service-list/service-list.component';
import { BillboardWideComponent } from './component/billboard-wide/billboard-wide.component';
import { SearchbarComponent } from './component/searchbar/searchbar.component';
import { AccountprofileComponent } from './component/accountprofile/accountprofile.component';
import { RatingComponent } from './component/rating/rating.component';
import { LoginComponent } from './component/login/login.component';
import { TextboxComponent } from './component/textbox/textbox.component';
import { FormsModule } from '@angular/forms';
import { ServicepageComponent } from './component/servicepage/servicepage.component';
import { CommentComponent } from './component/comment/comment.component';
import { ConnectService } from './service/connect/connect.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './component/register/register.component';
import { UploadfileComponent } from './component/uploadfile/uploadfile.component';
import { AccountConfigComponent } from './component/accountConfig/accountConfig.component';
import { ServiceCreateComponent } from './component/serviceCreate/serviceCreate.component';
import { LoginService } from './service/connect/login.service';
import { FetchService } from './service/connect/fetch.service';
import { AccountListComponent } from './component/accountList/accountList.component';
import { ServiceListPageComponent } from './component/serviceListPage/serviceListPage.component';
import { AgmCoreModule } from '@agm/core';
import { ProviderviewComponent } from './component/providerview/providerview.component';
import { ProviderServicestatsComponent } from './component/provider-servicestats/provider-servicestats.component';
import { ServiceclickedService } from './service/serviceclicked.service';

@NgModule({
  declarations: [			
    AppComponent,
    HeaderComponent,
    AccountviewComponent,
    BillboardComponent,
    HomepageComponent,
    ServiceCardComponent,
    ServiceListComponent,
    BillboardWideComponent,
    SearchbarComponent,
    AccountprofileComponent,
    RatingComponent,
    LoginComponent,
    TextboxComponent,
    ServicepageComponent,
    CommentComponent,
    RegisterComponent,
    UploadfileComponent,
    AccountConfigComponent,
    ServiceCreateComponent,
    AccountListComponent,
    ServiceListPageComponent,
    ProviderviewComponent,
    ProviderServicestatsComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      {path:'homepage',component:HomepageComponent},
      {path:'',component:HomepageComponent},
      {path:'account/:username/:id',component:AccountprofileComponent},
      {path:'login/:redirect',component:LoginComponent},
      {path:'service/:id',component:ServicepageComponent},
      {path:'register',component:RegisterComponent},
      {path:'accountconfig',component:AccountConfigComponent},
      {path:'servicecreate',component:ServiceCreateComponent},
      {path:'accountlist',component:AccountListComponent},
      {path:'servicelist/:type',component:ServiceListPageComponent}
    ]),
    FormsModule,HttpClientModule,AgmCoreModule.forRoot({apiKey:'AIzaSyBdMnd8ytUKFpPPc1lavM_ww_1CxJMvqOg'})
  ],
  providers: [ConnectService,LoginService,FetchService,ServiceclickedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
