import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AdminloginService } from 'src/app/service/adminlogin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  registerForm: FormGroup;
  formValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AdminloginService,
    private toastr: ToastrService,
    private router: Router,
    public toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      emailAddress: [null, [Validators.required, Validators.email]],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ])],      confirmPassword: [null, Validators.required]
    }, {
      validators: this.passwordCompareValidator
    });
  }

  passwordCompareValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : { notmatched: true };
  }

  get firstName() {
    return this.registerForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber') as FormControl;
  }

  get emailAddress() {
    return this.registerForm.get('emailAddress') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  OnSubmit() {
    this.formValid = true;
    if (this.registerForm.valid) {
      let register = this.registerForm.value;
      register.userType = 'user';
      this.service.registerUser(register).subscribe((data: any) => {
        if (data.result == 1) {
          this.toast.success({ detail: "SUCCESS", summary: data.data, duration: 3000 });
          setTimeout(() => {
            this.router.navigate(['userPage']);
          }, 1000);
        } else {
          this.toast.error({ detail: "ERROR", summary: data.message, duration: 3000 });
        }
      });
      this.formValid = false;
    } else {
      console.log('Form is invalid');
      this.logFormErrors();
    }
  }

  logFormErrors() {
    for (const controlName in this.registerForm.controls) {
      if (this.registerForm.controls.hasOwnProperty(controlName)) {
        const control = this.registerForm.get(controlName);
        if (control && control.invalid) {
          console.log(`Invalid Control: ${controlName}`, control.errors);
        }
      }
    }
  }
}
