import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uid:string = '';
  username:string = '';
  contact:string = '';
  email:string = '';
  houseAddress:string = '';
  role:string = '';

  results: any [];
  udetails: any [];
  updateUserDetails: FormGroup;
  modalContent:undefined;

  constructor(
    private auService:AuthService, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router:Router
    ) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem("uid")
    this.auService.getUserDetails(this.uid).subscribe(data => {
    this.udetails = data;
    console.log(this.udetails)
    this.username = this.udetails[0].name;
    this.email = this.udetails[0].email;
    this.contact = this.udetails[0].contact;
    this.houseAddress = this.udetails[0].houseAddress;
    this.role = this.udetails[0].role;
    });

    this.updateUserDetails = this.fb.group({
      editUsername: '',
      editEmail: '',
      editContact: '',
      editHouseAddress: ''
    })
    console.log(this.updateUserDetails)
  }

  updateProfile(){
    this.uid = sessionStorage.getItem("uid")
    this.auService.updateUserDetails(
      this.uid,
      this.updateUserDetails.value.editUsername,
      this.updateUserDetails.value.editEmail,
      this.updateUserDetails.value.editContact,
      this.updateUserDetails.value.editHouseAddress).subscribe(results =>{
        location.reload();
      })
  }

  deleteAccount(id: number)
  {
    this.auService.deleteUserAccount(this.uid).subscribe(results => {
      this.router.navigateByUrl('/home');
    });
  }

}
