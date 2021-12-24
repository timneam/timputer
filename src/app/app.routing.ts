import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {HomeComponent} from './home/home.component';
import {CommunityComponent} from './community/community.component';
import {CartComponent} from './cart/cart.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {Admin2Component} from './admin2/admin2.component';
import {AuthGuard} from './auth.guard';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { CustomPcComponent } from './custom-pc/custom-pc.component';
import { ProfileComponent } from './profile/profile.component';
import { CustompcdetailsComponent } from './custompcdetails/custompcdetails.component';


const appRoutes: Routes = [
{ path: 'register', component:RegisterComponent},
{ path: 'login', component:LoginComponent},
{ path: 'logout', component:LogoutComponent, canActivate: [AuthGuard], data:{permission: {only:["user","admin"]}}},
{ path: 'home', component:HomeComponent},
{ path: 'our-services', component:OurServicesComponent},
{ path: 'searchbar', component:SearchbarComponent},
{ path: 'custom-pc', component:CustomPcComponent},
{ path: 'community', component:CommunityComponent},
{ path: 'profile', component:ProfileComponent, canActivate: [AuthGuard], data:{permission: {only:["user","admin"]}}},
{ path: 'cart', component:CartComponent, canActivate: [AuthGuard], data:{permission: {only:["admin"]}}},
{ path: 'custompcdetails/:_id', component:CustompcdetailsComponent},
{ path: 'user', component:UserComponent, canActivate: [AuthGuard], data:{permission: {only:["admin"]}}},
{ path: 'admin', component:AdminComponent, canActivate: [AuthGuard], data:{permission: {only:["admin"]}}},
{ path: 'admin2', component:Admin2Component, canActivate: [AuthGuard], data:{permission: {only:["admin"]}}},
{ path: '', component:HomeComponent, pathMatch:'full'}
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);