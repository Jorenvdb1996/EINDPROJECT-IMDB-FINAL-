import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  documentId,
  DocumentReference,
  Firestore,
  getDoc,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Movie } from '../types/Movie';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import firestore = firebase.firestore;
import { RatingUser } from '../types/RatingUser';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: Firestore) {}

  async sendMovie(
    channel: string,
    titel: string,
    afspeelduur: string,
    budget: number,
    trailerlink: string,
    coverAfbeelding: string,
    productiehuis: string,
    launchDate: string
  ): Promise<void> {
    const newMovie = {
      titel: titel,
      afspeelduur: afspeelduur,
      budget: budget,
      trailerLink: trailerlink,
      coverAfbeelding: coverAfbeelding,
      productieHuis: productiehuis,
      launchDate: launchDate,
    };
    await addDoc(this.#getCollectionRef<Movie>(channel), newMovie);
  }

  retrieveMovies(channel: string): Observable<Movie[]> {
    return collectionData<Movie>(
      query<Movie>(this.#getCollectionRef(channel)),
      { idField: 'id' }
    );
  }

  retrieveMovieById(id: string, channel: string): Observable<Movie[]> {
    return collectionData<Movie>(
      query<Movie>(
        this.#getCollectionRef(channel),
        where(documentId(), '==', id)
      ),
      { idField: 'id' }
    );
  }

  async updateMovie(channel: string, id: string, movie: Movie): Promise<void> {
    // Note that the key is set to undefined.
    // There is no point in including it in the data because this would mean it is
    // saved twice, once in the document, and once as the document identifier.
    delete movie.id;
    await updateDoc(this.#getDocumentRef(channel, id), movie);
  }
  async deleteMovie(channel: string, id: string): Promise<void> {
    await deleteDoc(this.#getDocumentRef(channel, id));
  }
  async AddRating(
    idMovieinput: string,
    idUserinput: string,
    score: number,
    channel: string
  ): Promise<void> {
    const newRatingUser = {
      value: score,
      idMovie: idMovieinput,
      idUser: idUserinput,
    };
    await addDoc(this.#getCollectionRef<RatingUser>(channel), newRatingUser);
  }
  retrieveRatingsOneMovie(
    channel: string,
    movieId: string
  ): Observable<RatingUser[]> {
    return collectionData<RatingUser>(
      query<RatingUser>(
        this.#getCollectionRef(channel),
        where('idMovie', '==', movieId)
      ),
      { idField: 'id' }
    );
  }
  async UpdateRating(
    channel: string,
    id: string,
    ratingUser: RatingUser
  ): Promise<void> {
    // Note that the key is set to undefined.
    // There is no point in including it in the data because this would mean it is
    // saved twice, once in the document, and once as the document identifier.
    delete ratingUser.id;
    await updateDoc(this.#getDocumentRef(channel, id), ratingUser);
  }

  retrieveRatingUser(
    userId: string,
    MovieId: string,
    channel: string
  ): Observable<RatingUser[]> {
    return collectionData<RatingUser>(
      query<RatingUser>(
        this.#getCollectionRef(channel),
        where('idUser', '==', userId),
        where('idMovie', '==', MovieId)
      ),
      { idField: 'id' }
    );
  }

  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }

  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(
      this.firestore,
      `${collectionName}/${id}`
    ) as DocumentReference<T>;
  }
}
