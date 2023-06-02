import { Component, OnInit } from '@angular/core';
import {from, Observable} from 'rxjs';
import {Movie} from '../../../types/Movie';
import {DatabaseService} from '../../../services/database.service';
import {documentId, where} from '@angular/fire/firestore';

@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.page.html',
  styleUrls: ['./listmovies.page.scss'],
})
export class ListmoviesPage implements OnInit {
  moviefilteredList:Movie[] = [];
  channelName="Movie";
  movieObservable: Observable<Movie[]> = from([]);
  loading: any;
  constructor(private dbService: DatabaseService) {
    this.movieObservable = dbService.retrieveMovies(this.channelName);
    this.movieObservable.subscribe(res => {
      const data = res;
      this.moviefilteredList = data;
    });
  }
  ngOnInit() {
  }
  SearchbarInput(input:any){
    if (input.value == "" ){
      this.movieObservable.subscribe(res => {
        const data = res;
        this.moviefilteredList = data;
        console.log("nothing")
      })
    }
    else{
      this.movieObservable.subscribe(res => {
        const data = res;
        const query = input.value.toLowerCase();
        this.moviefilteredList = data.filter((d) => d.titel.toLowerCase().indexOf(query) > -1);
        console.log("filter")
      })

    }
  }


}
