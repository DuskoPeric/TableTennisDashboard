import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTableColumns, faUser,faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [FontAwesomeModule,RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  authService=inject(AuthService);
  user=this.authService.user
  icons = {
    dashboard:faTableColumns,
    profile:faUser,
    signin:faSignIn,
    signout:faSignOut,
  };
  logOut(){
    this.authService.logOut();
  }
  constructor(){}
}
