import {Component, Input, OnInit} from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import {from, Observable, of} from 'rxjs';
import {Movie} from '../../types/Movie';
import { ActivatedRoute } from '@angular/router';
import {getDownloadURL, getStorage, ref} from '@angular/fire/storage';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

/////

@Component({
  selector: 'app-wijzigen',
  templateUrl: './wijzigen.page.html',
  styleUrls: ['./wijzigen.page.scss'],
})

export class WijzigenPage implements OnInit {
  channelName = 'Movie';

  movieObservable: Observable<Movie[]> = from([]);
  @Input() movie: Movie = {titel: '', afspeelduur: '', budget: 0, trailerLink:'', coverAfbeelding: '',productieHuis:'', launchDate:'' };
  data  :any;
  id? : string | null;

  constructor(private dbService: DatabaseService, public activatedRoute: ActivatedRoute) {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id != null){
      this.movieObservable = dbService.retrieveMovieById(this.id,this.channelName);
      this.setData()
    }

  }

  setData(){
    this.movieObservable.subscribe((res) => {
      this.data = res;
      this.movie = this.data[0];
      this.setImage(this.movie.coverAfbeelding);
    });

  }

  updataData(){
    this.id = this.movie.id;
    if (this.id != null){
      this.dbService.updateMovie(this.channelName,this.id,this.movie)}
  }

   async setImage(file:string){
    const storage = getStorage();


    getDownloadURL(ref(storage, 'gs://imdb-eba1c.appspot.com/' + file))

      .then((url) => {
          const img = document.getElementById('cover');
          let coverText = document.getElementById('coverText')
          if(img != null && coverText != null){
            img.setAttribute('src', url);
            coverText.setAttribute('value',file)
          }
        })
      .catch((error) => {
      });

  }
  DeleteMovie(){
    if (this.movie.id != null){
      this.dbService.deleteMovie(this.channelName,this.movie.id);

    }
  }
  ngOnInit() {
  }

}
