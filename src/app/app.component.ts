import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { home } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  CheckUserLoggedIn: boolean = false;

  constructor(public authService: AuthService) {}
  protected readonly home = home;
}
