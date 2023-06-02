import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { home } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  error = true;
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  loginEmailandPassword() {
    try {
      this.authService.LogInWithEmail(this.username, this.password);
    } catch (e) {
      this.error = false;
      console.log(this.error);
    }
  }

  protected readonly home = home;
}
