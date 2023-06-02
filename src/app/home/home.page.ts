import { Component } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Movie } from '../types/Movie';
import { DatabaseService } from '../services/database.service';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';
let randomValue1: number;
let randomValue2: number;
let randomValue3: number;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  option = {
    slidesPerView: 1.5,
    centeredSlides: false,
    loop: false,
    spaceBetween: 5,
  };

  moviefilteredFinallist: Movie[] = [];
  moviefilteredlist: Movie[] = [];
  movielist: Movie[] = [];
  channelName = 'Movie';
  movieObservable: Observable<Movie[]> = from([]);
  loading: any;

  constructor(
    private dbService: DatabaseService,
    public authService: AuthService
  ) {
    this.moviefilteredFinallist = [];

    this.movieObservable = dbService.retrieveMovies(this.channelName);
    this.movieObservable.subscribe((res) => {
      this.movielist = res;
      this.pickrandom();
      this.SetData();
      console.log(this.moviefilteredFinallist);
    });
  }

  pickrandom() {
    randomValue1 = Math.floor(Math.random() * this.movielist.length);
    let randomCheck1 = false;
    let randomCheck2 = false;

    while (!randomCheck1) {
      randomValue2 = Math.floor(Math.random() * this.movielist.length);
      if (randomValue2 !== randomValue1) {
        randomCheck1 = true;
      }
    }

    while (!randomCheck2) {
      randomValue3 = Math.floor(Math.random() * this.movielist.length);
      if (randomValue3 !== randomValue2 && randomValue3 !== randomValue1) {
        randomCheck2 = true;
      }
    }
  }

  SetData() {
    this.moviefilteredlist.push(this.movielist[randomValue1]);
    this.moviefilteredlist.push(this.movielist[randomValue2]);
    this.moviefilteredlist.push(this.movielist[randomValue3]);

    for (let i = 0; i < 3; i++) {
      this.setImage(i);
    }
  }
  async setImage(set: number) {
    let id;
    const storage = await getStorage();
    try {
      await getDownloadURL(
        ref(
          storage,
          'gs://imdb-eba1c.appspot.com/' +
            this.moviefilteredlist[set].coverAfbeelding
        )
      )
        .then((url) => {
          console.log(url);
          this.moviefilteredlist[set].coverAfbeelding = url;
          console.log(this.moviefilteredlist[set].coverAfbeelding);
          const newMovie = {
            id: this.moviefilteredlist[set].id,
            titel: this.moviefilteredlist[set].titel,
            afspeelduur: this.moviefilteredlist[set].afspeelduur,
            budget: this.moviefilteredlist[set].budget,
            trailerLink: this.moviefilteredlist[set].trailerLink,
            coverAfbeelding: url,
            productieHuis: this.moviefilteredlist[set].productieHuis,
            launchDate: this.moviefilteredlist[set].launchDate,
          };
          this.moviefilteredFinallist.push(newMovie);
        })
        .catch((error) => {});
    } catch (e) {}
  }
}
