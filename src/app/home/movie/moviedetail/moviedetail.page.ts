import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../types/Movie';
import { from, Observable } from 'rxjs';
import { DatabaseService } from '../../../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { AuthService } from '../../../services/auth.service';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.page.html',
  styleUrls: ['./moviedetail.page.scss'],
})
export class MoviedetailPage implements OnInit {
  channelName = 'Movie';

  movieObservable: Observable<Movie[]> = from([]);
  @Input() movie: Movie = {
    titel: '',
    afspeelduur: '',
    budget: 0,
    trailerLink: '',
    coverAfbeelding: '',
    productieHuis: '',
    launchDate: '',
  };
  @Input() hiddenImage: boolean = true;
  data: any;
  id?: string | null;
  constructor(
    private dbService: DatabaseService,
    public activatedRoute: ActivatedRoute,
    public authservice: AuthService,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.movieObservable = dbService.retrieveMovieById(
        this.id,
        this.channelName
      );
      this.setData();
    }
  }
  ngOnInit() {}

  async setData() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    await this.movieObservable.subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.setImage(this.data[0].coverAfbeelding);
      this.movie.titel = this.data[0].titel;
      this.movie.afspeelduur = this.data[0].afspeelduur;
      this.movie.budget = this.data[0].budget;
      this.movie.trailerLink = this.data[0].trailerLink;
      this.movie.productieHuis = this.data[0].productieHuis;
      this.movie.launchDate = this.data[0].launchDate;
    });
    this.hiddenImage = false;
  }
  async setImage(file: string) {
    const storage = getStorage();
    await getDownloadURL(ref(storage, 'gs://imdb-eba1c.appspot.com/' + file))
      .then((url) => {
        this.movie.coverAfbeelding = url;
      })
      .catch((error) => {});
  }

  share(titel: string) {
    const urlString = 'https://imdb-eba1c.web.app' + this.router.url;

    console.log(titel);

    Share.share({
      title: titel,
      text: 'Leuke film dat ik ontdekt heb!',
      url: urlString,
      dialogTitle: 'Deel met vrienden',
    });
  }
  openTrailer(trailer: string) {
    const urlString: string = this.movie.trailerLink;
    console.log(trailer);
    Browser.open({ url: trailer, toolbarColor: '#FFFF00' });
  }
}
