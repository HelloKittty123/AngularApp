import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheServiceService } from 'src/service/cache/cache-service.service';
import { SessionStateService } from 'src/service/session/session-state.service';
import { UserService } from 'src/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  isValidError: boolean = false;

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
    this.userService.login({ ...this.loginForm.value }).subscribe({
      next: (res) => {
        if (Object.keys(res).length) {
          this.cacheService.setCookie('email', this.loginForm.value.email);
          this.cacheService.setCookie(
            'userName',
            this.loginForm.value.password
          );
          const previousUrl = this.sessionStateService.getUrl();
          if (previousUrl) {
            this.sessionStateService.clearUrl();

            this.router.navigateByUrl(previousUrl);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.loginForm.reset();
          this.isValidError = true;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
