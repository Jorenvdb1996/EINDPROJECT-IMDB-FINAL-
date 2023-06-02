import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registreer',
  templateUrl: './registreer.page.html',
  styleUrls: ['./registreer.page.scss'],
})
export class RegistreerPage implements OnInit {
  username = '';
  password = '';
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  RegisteerNieuweGebruiker() {
    this.authService.registerWithEmailandPassword(this.username, this.password);
  }
}
