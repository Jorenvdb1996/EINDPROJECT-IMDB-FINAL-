import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { DatabaseService } from '../services/database.service';
import { Movie } from '../types/Movie';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  channelName = 'Movie';
  movieObservable: Observable<Movie[]> = from([]);

  constructor(private dbService: DatabaseService) {
    this.movieObservable = dbService.retrieveMovies(this.channelName);
  }
  async ngOnInit() {}
}
