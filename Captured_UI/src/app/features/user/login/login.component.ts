import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IApiResponse } from '../../../interfaces/api-response.interface';
import { UserService } from '../../../services/user.service';
import { UserLogin } from '../../../interfaces/user-login';
import { Token } from '../../../interfaces/token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private fb: FormBuilder,
    private userService: UserService,
  ) {
  }

  loginForm = new FormGroup({
    username: new FormControl ('', [Validators.required, Validators.required]),
    password: new FormControl ('', [Validators.required, Validators.minLength(6)])
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
            console.log('Login success');
            alert( response.body.token)
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

  ngOnInit(){
  }

}
