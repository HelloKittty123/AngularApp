import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

import { CacheServiceService } from 'src/service/cache/cache-service.service';
import { SessionStateService } from 'src/service/session/session-state.service';
import { UserService } from 'src/service/user/user.service';
import { Error } from '../type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  isValidError: boolean = false;
  loadingStatus: number = 0;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private sessionStateService: SessionStateService,
    private cacheService: CacheServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        {
          nonNullable: true,
          validators: Validators.compose([Validators.required]),
        },
      ],
      password: [
        '',
        {
          nonNullable: true,
          validators: Validators.compose([Validators.required]),
        },
      ],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loadingStatus = 1;

      this.userService.login({ ...this.loginForm.value }).subscribe({
        next: (res) => {
          if (res.length) {
            this.userService.authenticate(res[0]);
            var token = CryptoJS.AES.encrypt(
              JSON.stringify(res[0]),
              environment.key
            ).toString();
            this.cacheService.setCookie('token', token);
            const previousUrl = this.sessionStateService.getUrl();
            if (previousUrl) {
              this.sessionStateService.clearUrl();
              this.router.navigateByUrl(previousUrl);
            } else {
              this.router.navigate(['/']);
            }
          } else {
            this.isValidError = true;
          }
          this.loadingStatus = 0;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
