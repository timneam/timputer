import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  regUser(username: string, pw: string, email: string, contact: string, houseAddress: string, role: string) {
    return this.http.post<any[]>('./api/reguser/', {
      'username': username,
      'password': pw,
      'email':email, 
      'contact':contact,
      'houseAddress':houseAddress,
      'role': role });
  }

    authUser(username: string, pw: string) {
    return this.http.post<any[]>('./api/authuser/', {
      'username': username,
      'password': pw });
  }

  getUserDetails(_id) {
    return this.http.get<any[]>('./api/users/' + _id );
  }

  deleteUserAccount(_id) {
    return this.http.delete<any[]>('./api/users/' + _id );
  }

  updateUserDetails(_id, name:string, email:string, contact:string, houseAddress:string) {
    return this.http.put<any[]>('./api/users/' + _id, {'name':name, 'email':email, 'contact':contact, 'houseAddress':houseAddress});
  }
  
  //---------------------------------------------------------------------

  setUserId(_id: string){
    sessionStorage.setItem ("uid", _id);
    }

  getUserId() {
    return sessionStorage .getItem("uid")
  }

  //----------------------------------------------------------------------

  setSecureToken(secure_token: string) {
    sessionStorage.setItem("LoggedIn", secure_token)
  }

  getSecureToken() {
    return sessionStorage .getItem("LoggedIn")
  }

  //--------------------------------------------------------------------

  setUserContact(contact: string) {
    sessionStorage .setItem("UserContact", contact);
  }

  getUserContact() {
    return sessionStorage .getItem("UserContact")
  }

  //--------------------------------------------------------------------

  setUserHouseAddress(houseAddress: string) {
    sessionStorage .setItem("UserHouseAddress", houseAddress);
  }

  getUserHouseAddress() {
    return sessionStorage .getItem("UserHouseAddress")
  }

    //--------------------------------------------------------------------

    setUserEmail(email: string) {
      sessionStorage .setItem("UserEmail", email);
    }
  
    getUserEmail() {
      return sessionStorage .getItem("UserEmail")
    }
  

  //--------------------------------------------------------------------

  setUserRole(role: string) {
    sessionStorage .setItem("UserRole", role);
  }

  getUserRole() {
    return sessionStorage .getItem("UserRole")
  }

  //--------------------------------------------------------------------

    logout() {
      sessionStorage.removeItem("uid");
      sessionStorage.removeItem("LoggedIn");
      sessionStorage.removeItem("UserContact");
      sessionStorage.removeItem("UserHouseAddress");
      sessionStorage.removeItem("UserEmail");
      sessionStorage.removeItem("UserRole");
  }

  isLoggedIn() {
    return this.getSecureToken() !== null;
    }
   
    isAdmin() {
   return (this.getUserRole() == "admin");
    }
   
    isUser() {
    return (this.getUserRole() == "user" || this.getUserRole() == "admin");
    }
}
