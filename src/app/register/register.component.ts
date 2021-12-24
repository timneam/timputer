import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group ({
      name: ['', Validators.required ],
      password: ['', Validators.required ],
      email: ['', Validators.required ],
      contact: ['', Validators.required],
      houseAddress: ['', Validators.required ],
      role: ['', Validators.required ]
    });
  }

  onSubmit() {
    this.authService.regUser(
      this.myForm.value.name,
      this.myForm.value.password, 
      this.myForm.value.email, 
      this.myForm.value.contact, 
      this.myForm.value.houseAddress, 
      this.myForm.value.role).subscribe();
    this.router.navigateByUrl('/login');
     }

}
