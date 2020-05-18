import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  constructor(private fb: FormBuilder,
              private httpClient: HttpClient,
              private router: Router) {
    this.formLogin = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
  }

  ngOnInit() {
  }

  login(){
    if (this.formLogin.invalid) {
      alert('Ingresa los datos correctamente');
      return;
    }

    console.log('>>> body', this.formLogin.value);

    this.httpClient.post('https://reqres.in/api/login', this.formLogin.value)
      .subscribe(res => {
        console.log('>>>res', res);
        this.router.navigate(['home']);
      }, err => {
        console.log('>>>err', err);
        alert(err.error.error);
      });

  }

}
