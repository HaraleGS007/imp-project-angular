import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.css'
})
export class RegistersComponent {
  form!:FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private _http :HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        number: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),],],
        email: ['', [Validators.required, Validators.email]],
        password: [ '',[Validators.required,Validators.minLength(6),Validators.maxLength(40),],],
      },
    );
  }

  onSubmit(){
   this.submitted=true;

if(this.form.invalid){
  return;
}
console.log(JSON.stringify(this.form.value, null, 2))

this._http.post<any>('http://localhost:3000/signup',this.form.value).subscribe((res)=>{
  alert('Registrer Sucessfully....')
  this.form.reset;
  this.router.navigate(['login'])
}, err=>{
  alert('Wrong type error...')}

)
  }
}

