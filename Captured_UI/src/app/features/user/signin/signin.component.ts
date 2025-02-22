import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IApiResponse } from '../../../interfaces/api-response.interface';
import { Token } from '../../../interfaces/token';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { UserRegister } from '../../../interfaces/user-register';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^\d+$/)
    ]),
    document: new FormControl('', [Validators.required]),
    terms: new FormControl(false, Validators.requiredTrue),
    rememberMe: new FormControl(false)
  });
  
  register() {
    if (this.registerForm.valid) {
      const user: UserRegister = {
        username: this.registerForm.value.username ?? '',
        password: this.registerForm.value.password ?? '',
        email: this.registerForm.value.email ?? '',
        names: this.registerForm.value.name ?? '',
        lastname: this.registerForm.value.lastname ?? '',
        address: this.registerForm.value.address ?? '',
        phone: this.registerForm.value.phone ?? '',
        document: this.registerForm.value.document ?? ''
      };
      console.log(user);
      this.userService.register(user).subscribe(
        (response: IApiResponse<Token>) => {
          if (response.status === 201) {
            if (this.registerForm.value.rememberMe) {
              this.userService.saveUserInLocalStorage(response.body, user.username);
            } else {
              this.userService.saveUserInSessionStorage(response.body, user.username);
            }
            
            alert('Registro exitoso. Bienvenido!');
            this.goToHome();
          } else {
            console.log('Registro fallido' + response);
          }
        },
        (error: any) => {
          console.error('Error en el registro:', error);
          alert('Ocurrió un error en el registro.');
        }
      );
    } else {
      alert('Por favor, revisa los campos del formulario.');
    }
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  goToTerms(){
    this.router.navigate(['terms']);
  }
  
}
