import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { AuthService } from './auth/auth.service';
import { User } from './auth/auth.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  authService=inject(AuthService)
  title = 'TableTennisDashboard';
  constructor(){

  }
  ngOnInit(): void {
    const userData=localStorage.getItem('userData')
    if(userData){
      const user=JSON.parse(userData)
      const newUser=new User(user.id,user.name,user._token,user.email)
      this.authService.user.set(newUser);
    }
  }
}
