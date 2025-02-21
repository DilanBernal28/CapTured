import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IApiResponse } from '../../../interfaces/api-response.interface';
import { UserService } from '../../../services/user.service';
import { UserLogin } from '../../../interfaces/user-login';
import { Token } from '../../../interfaces/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  loginForm = new FormGroup({
    username: new FormControl ('', [Validators.required, Validators.required]),
    password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
    terms: new FormControl (false, Validators.requiredTrue),
    rememberMe: new FormControl (false)
  });

  login(){
    if(this.loginForm.value.username && this.loginForm.value.password){
      const user:UserLogin = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.userService.login(user).subscribe(
        (response: IApiResponse<Token>) => {
          if (response.status === 200) {
            switch (this.loginForm.value.rememberMe) {
              case true:
                this.userService.saveUserInLocalStorage(response.body, user.username);
                break;
              case false:
                this.userService.saveUserInSessionStorage(response.body, user.username);
                break;
            }
            this.userService.saveUserInLocalStorage(response.body, user.username);
            alert(localStorage.getItem('user'));
            this.goToHome();
          } else {
            console.log('Login failed');
          }
        },
        (error: any) => {
          console.error(error)
        }
      )
    }
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  goToTerms(){
    this.router.navigate(['terms']);
  }

  ngOnInit(){
  }

}
