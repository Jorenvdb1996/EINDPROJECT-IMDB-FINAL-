import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RatingUser } from '../../types/RatingUser';
import { Movie } from '../../types/Movie';
import { from, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  ratingObservableSingle: Observable<RatingUser[]> = from([]);
  ratingObservableFull: Observable<RatingUser[]> = from([]);
  movieId?: string | null;
  userId?: string | null;
  channel: string = 'RatingUser';
  data: any;
  id?: string | null;
  allRateList: RatingUser[] = [];

  @Input() starNumbers = [1, 2, 3, 4, 5];
  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  @Input() RatingUser: RatingUser = { idUser: '', idMovie: '', value: 0 };
  @Input() averageRating: number = 0;

  constructor(
    private auth: Auth,
    private dbService: DatabaseService,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute
  ) {
    if (authService.getUserUID())
      this.movieId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.movieId != null) {
      this.ratingObservableFull = this.dbService.retrieveRatingsOneMovie(
        this.channel,
        this.movieId
      );
    }
    this.GetAvarage();
    this.userId = this.authService.getUserUID();
    if (this.userId != null && this.movieId != null) {
      this.ratingObservableSingle = this.dbService.retrieveRatingUser(
        this.userId,
        this.movieId,
        this.channel
      );
    }
    this.rating = 0;
    if (this.userId != null && this.movieId != null) {
      this.ratingObservableSingle.subscribe((res) => {
        this.RatingUser = res[0];
        this.rating = this.RatingUser.value;
        this.id = this.RatingUser.id;
      });
    }
  }

  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
    this.authService.getUserUID();
    if (this.movieId != null && this.userId != null) {
      if (this.RatingUser == undefined) {
        this.dbService.AddRating(
          this.movieId,
          this.userId,
          this.rating,
          this.channel
        );
      }
      if (this.RatingUser.id != null) {
        if (this.id != undefined) {
          this.RatingUser.value = index;
          this.dbService.UpdateRating(this.channel, this.id, this.RatingUser);
        }
      }
    }
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return '#808080';
    }
    return '#FFFF00';
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  GetAvarage() {
    this.ratingObservableFull.subscribe((res) => {
      this.allRateList = res;
      let sumAll = 0;
      const userCount = this.allRateList.length;
      this.allRateList.forEach((x) => {
        sumAll += x.value;
      });
      this.averageRating = sumAll / userCount;
    });
  }

  async ngOnInit() {}
}
