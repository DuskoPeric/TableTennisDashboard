import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthResponseData, ErrorMessage, User, UserData } from './auth.model';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errorMessage=signal<ErrorMessage|null>(null)
  router = inject(Router);
  user = signal<User | null>(null)
  http = inject(HttpClient);
  private authUrl = 'http://localhost:3000';

  signIn(data: Partial<UserData>) {
    this.handleUser(
      this.http.post<AuthResponseData>(`${this.authUrl}/login`, data)
    );
  }

  signUp(data: Partial<UserData>) {
    const registerData={...data,
      avatar: "avatar",
      playerScore: {
        points: 0,
        won: 0,
        lost: 0
      }
    }
    this.handleUser(
      this.http.post<AuthResponseData>(`${this.authUrl}/register`, registerData)
    );
  }

  handleUser(obs: Observable<AuthResponseData>) {
    obs.subscribe({
      next: (userData) => {
        const user = new User(
          userData.user,
          userData.accessToken,
        );
        this.user.set(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set({type:'api',message:error.message})
      },
    });
  }
  logOut(){
    this.user.set(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  constructor() {}
}
