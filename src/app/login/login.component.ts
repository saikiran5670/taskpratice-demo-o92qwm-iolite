import { Component, OnInit } from '@angular/core';
import {
  FormGroup,  FormBuilder,  Validators,  FormControl} from '@angular/forms';

  import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.email]]


    });
  }
   validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    // if (this.form.valid) {
    //   console.log(this.form);

    // } 
    // else {
      if( this.validateAllFormFields(this.form)){
    this.router.navigate(['./landing']);

      }
    // }

  }
  // OnSubmit(){
  //   this.router.navigate(['./landing']);
  // }

 

  reset(){
    this.form.reset();
  }
}

