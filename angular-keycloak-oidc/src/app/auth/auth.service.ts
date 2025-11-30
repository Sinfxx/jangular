import { Injectable } from '@angular/core';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private async configure() {
    this.oauthService.configure(authConfig);

    // Subscribe to token events
    this.oauthService.events
      .pipe(filter((e: OAuthEvent) => e.type === 'token_received'))
      .subscribe(() => {
        this.isAuthenticatedSubject$.next(true);
      });

    this.oauthService.events
      .pipe(filter((e: OAuthEvent) => e.type === 'logout'))
      .subscribe(() => {
        this.isAuthenticatedSubject$.next(false);
      });

    // Try to login
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    // Check if we have a valid token after trying to login
    if (this.oauthService.hasValidAccessToken()) {
      this.isAuthenticatedSubject$.next(true);
    }
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  get identityClaims(): any {
    return this.oauthService.getIdentityClaims();
  }
}
