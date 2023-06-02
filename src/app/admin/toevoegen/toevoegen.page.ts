import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import {getDownloadURL, getStorage, ref} from '@angular/fire/storage';
import {dateTimestampProvider} from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
  selector: 'app-toevoegen',
  templateUrl: './toevoegen.page.html',
  styleUrls: ['./toevoegen.page.scss'],
})
export class ToevoegenPage implements OnInit {
  launchDate = "";
  titel ="";
  afspeelduur="";
  budget= "";
  trailerlink= "";
  coverAfbeelding= "";
  productiehuis = "";
  channelName = 'Movie';


  constructor(private dbService: DatabaseService) {
  }
  ngOnInit() {
  }


  addMovie() {
      this.dbService.sendMovie(this.channelName,this.titel, this.afspeelduur,Number(this.budget),this.trailerlink, this.coverAfbeelding,this.productiehuis ,this.launchDate).then();

  }




}
