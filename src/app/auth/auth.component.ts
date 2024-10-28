import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { InputComponent } from '../ui/input/input.component';
import { ButtonComponent } from '../ui/button/button.component';
import { AuthService } from './auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, NgClass],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  submited = false;
  authService = inject(AuthService);
  errorMsg = this.authService.errorMessage;
  rotation = '';
  isRegister = false;

  icons = {
    email: faEnvelope,
    password: faLock,
    name: faUser,
  };

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  isFormValid(): boolean {
    return this.isRegister
      ? this.form.valid
      : this.form.controls['email'].valid &&
          this.form.controls['password'].valid;
  }

  onSubmit() {
    this.submited = true;
    if (this.isFormValid()) {
      const data = this.form.value;
      this.isRegister
        ? this.authService.signUp(data)
        : this.authService.signIn(data);
    } else {
      this.errorMsg.set({
        type: 'validation',
        message: 'All fields are required',
      });
    }
  }

  switchView() {
    this.rotation = this.rotation === 'rotate' ? 'rotate-reverse' : 'rotate';
    setTimeout(() => {
      this.isRegister = !this.isRegister;
      this.submited = false;
    }, 200);
  }

  isErrorMessage() {
    return (
      this.submited &&
      ((this.errorMsg()?.type === 'validation' && !this.isFormValid()) ||
        this.errorMsg()?.type === 'api')
    );
  }
}
