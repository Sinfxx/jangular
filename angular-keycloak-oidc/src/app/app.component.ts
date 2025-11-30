import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = signal('angular-keycloak-oidc');
  apiResult = signal<any>(null);

  constructor(public auth: AuthService, private http: HttpClient) {}

  callApi() {
    console.log('Calling API with token:', this.auth.accessToken ? 'Token present' : 'No token');
    this.apiResult.set(null); // Clear previous result

    this.http.get('http://localhost:8081/api/v1/hello')
      .subscribe({
        next: (res) => {
          console.log('API call successful:', res);
          this.apiResult.set(res);
        },
        error: (err) => {
          console.error('API call failed:', err);
          this.apiResult.set({ error: err.message || 'Request failed' });
        }
      });
  }
}
