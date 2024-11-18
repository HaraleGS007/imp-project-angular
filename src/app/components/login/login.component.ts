import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:FormGroup;

submitted = false;
constructor(private fb:FormBuilder, private _http:HttpClient, private rout:Router){
  this.loginForm = this.fb.group({
    email:['',[Validators.required,Validators.minLength(5)]],
    password:['',[Validators.required, Validators.minLength(6)]]
  })

}

login(){
  this.submitted = true;
  if(this.loginForm.invalid){
    return
  }
  console.log(JSON.stringify(this.loginForm.value))
  this._http.get<any>('http://localhost:3000/signup').
  subscribe((res:any)=>{
    const user = res.find((val: any) => {
      return val.email === this.loginForm.value.email && val.password === this.loginForm.value.password

    })
    if(user){
      alert('Login Successfull...!')
      this.loginForm.reset
      this.rout.navigate(['home'])
    }else{
      alert('Login Failed')
      this.rout.navigate(['login'])
    }
  })
}
}
