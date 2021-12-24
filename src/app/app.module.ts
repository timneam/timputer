import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { CommunityComponent } from './community/community.component';
import { CartComponent } from './cart/cart.component';
import { NavComponent } from './nav/nav.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { CustomPcComponent } from './custom-pc/custom-pc.component';
import { ProfileComponent } from './profile/profile.component';
import { NewProductComponent } from './new-product/new-product.component';
import { CustompcdetailsComponent } from './custompcdetails/custompcdetails.component';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { Admin2Component } from './admin2/admin2.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    UserComponent,
    AdminComponent,
    HomeComponent,
    CommunityComponent,
    CartComponent,
    NavComponent,
    SearchbarComponent,
    OurServicesComponent,
    CustomPcComponent,
    ProfileComponent,
    NewProductComponent,
    CustompcdetailsComponent,
    Admin2Component,
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule, 
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
