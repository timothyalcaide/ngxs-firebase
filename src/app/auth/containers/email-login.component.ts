import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  template: `
    <mat-card>
      <div *ngIf="isSignup">
        <h3>Create Account</h3>

        <button mat-stroked-button (click)="changeType('login')">
          Returning user?
        </button>
      </div>

      <div *ngIf="isLogin">
        <h3>Sign In</h3>
        <button size="small" mat-stroked-button (click)="changeType('signup')">
          New user?
        </button>
      </div>

      <div *ngIf="isPasswordReset">
        <h3>Reset Password</h3>
        <button size="small" mat-button (click)="changeType('login')">
          Back
        </button>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field [color]="email.valid && 'accent'">
          <input
            matInput
            formControlName="email"
            type="email"
            placeholder="Email"
            autocomplete="off"
          />

          <mat-error *ngIf="email.invalid && email.dirty">
            You must enter a valid email address
          </mat-error>
        </mat-form-field>

        <mat-form-field
          [color]="email.valid && 'accent'"
          *ngIf="!isPasswordReset"
        >
          <input
            matInput
            formControlName="password"
            type="password"
            placeholder="Password"
            autocomplete="off"
          />

          <mat-error *ngIf="password.invalid && password.dirty">
            Password must be at least 6 characters long
          </mat-error>
        </mat-form-field>

        <mat-form-field
          [color]="passwordDoesMatch ? 'accent' : 'warn'"
          *ngIf="isSignup"
        >
          <input
            matInput
            formControlName="passwordConfirm"
            type="password"
            placeholder="Confirm password"
            autocomplete="off"
          />

          <mat-error *ngIf="passwordConfirm.dirty && !passwordDoesMatch">
            Password does not match
          </mat-error>
        </mat-form-field>

        <ng-container *ngIf="serverMessage">
          <div class="server-error">{{ serverMessage }}</div>
        </ng-container>

        <button
          *ngIf="isPasswordReset"
          mat-stroked-button
          type="submit"
          [disabled]="loading"
        >
          Send Reset Email
        </button>

        <button
          *ngIf="!isPasswordReset"
          mat-raised-button
          color="accent"
          type="submit"
          [disabled]="form.invalid || !passwordDoesMatch || loading"
        >
          Submit
        </button>
      </form>

      <button
        mat-button
        *ngIf="isLogin && !isPasswordReset"
        (click)="changeType('reset')"
      >
        Forgot password?
      </button>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        min-width: 150px;
        max-width: 500px;
        width: 100%;
        margin: 0 auto;
      }

      mat-form-field {
        width: 100%;
        margin-bottom: 16px;
      }

      .server-error {
        margin: 8px 0;
      }

      input {
        height: 2em;
      }

      div.mat-form-field-infix {
        padding: 0.3em 0;
      }

      input.mat-input-element {
        vertical-align: top;
      }

      div.mat-form-field-wrapper {
        padding-bottom: 1.15em;
      }
    `,
  ],
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;

  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  serverMessage: string;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });
  }

  changeType(val) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
}
