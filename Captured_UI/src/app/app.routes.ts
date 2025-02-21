import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/user/login/login.component';
import { SigninComponent } from './features/user/signin/signin.component';
import { DocsComponent } from './features/docs/docs.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: SigninComponent},
    {path: 'terms', component: DocsComponent},
];
