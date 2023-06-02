import {Component, Input, OnInit} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Movie} from '../../types/Movie';
import {DatabaseService} from '../../services/database.service';

@Component({
  selector: 'app-wijzigenoverzicht',
  templateUrl: './wijzigenoverzicht.page.html',
  styleUrls: ['./wijzigenoverzicht.page.scss'],
})
export class WijzigenoverzichtPage implements OnInit {

  @Input() movie: Movie = {titel: '', afspeelduur: '', budget: 0, trailerLink:'', coverAfbeelding: '',productieHuis:'', launchDate: ''};
  moviefilteredList: Movie[] = [];

  channelName= 'Movie';
  movieObservable: Observable<Movie[]> = from([]);
  loading: any;

  constructor(private dbService: DatabaseService) {
    this.movieObservable = dbService.retrieveMovies(this.channelName);
    this.movieObservable.subscribe(res => {
      const data = res;
      this.moviefilteredList = data;
    });
  }
  SearchbarInput(input: any){
    if (input.value === '' ){
      this.movieObservable.subscribe(res => {
        const data = res;
        this.moviefilteredList = data;
      });
    }
    else{
      this.movieObservable.subscribe(res => {
        const data = res;
        const query = input.value.toLowerCase();
        this.moviefilteredList = data.filter((d) => d.titel.toLowerCase().indexOf(query) > -1);
      });

    }
  }
  ngOnInit() {
  }

}
