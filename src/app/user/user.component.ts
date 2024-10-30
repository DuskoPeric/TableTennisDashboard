import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faStar, faPencil} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  authService=inject(AuthService)
  user=this.authService.user;

  icons={
    star:faStar,
    edit:faPencil
  }
  
}
