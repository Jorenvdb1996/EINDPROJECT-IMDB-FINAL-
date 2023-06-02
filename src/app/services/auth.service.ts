import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Router } from '@angular/router';
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithCredential,
  signOut,
  Unsubscribe,
  user,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  updateProfile,
  GoogleAuthProvider,
  PhoneAuthProvider,
  User,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  adminCheck = false;
  public currentUser: BehaviorSubject<null | User> =
    new BehaviorSubject<null | User>(null);
  #verificationId?: string;

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user) => this.setCurrentUser(user));
  }

  isLoggedIn(): boolean {
    return this.currentUser.value !== null;
  }
  getDisplayName(): string | undefined {
    return this.currentUser.value?.displayName ?? undefined;
  }
  getUserUID(): string | undefined {
    return this.currentUser.value?.uid;
  }
  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();
    if (Capacitor.isNativePlatform()) {
      await signOut(this.auth);
    }
  }
  async signInWithGoogle(): Promise<void> {
    const { credential } = await FirebaseAuthentication.signInWithGoogle();
    if (Capacitor.isNativePlatform() && credential?.idToken) {
      const newCredential = GoogleAuthProvider.credential(credential?.idToken);
      await signInWithCredential(this.auth, newCredential);
    }
  }
  async signInWithFacebook(): Promise<void> {
    const { credential } = await FirebaseAuthentication.signInWithFacebook();
    if (Capacitor.isNativePlatform() && credential?.idToken) {
      const newCredential = FacebookAuthProvider.credential(
        credential?.idToken
      );
      await signInWithCredential(this.auth, newCredential);
    }
  }
  async signInWithTwitter(): Promise<void> {
    const { credential } = await FirebaseAuthentication.signInWithTwitter();
    if (Capacitor.isNativePlatform() && credential?.idToken) {
      if (credential.secret !== undefined) {
        const newCredential = TwitterAuthProvider.credential(
          credential?.idToken,
          credential.secret
        );
        await signInWithCredential(this.auth, newCredential);
      }
    }
  }
  async registerWithEmailandPassword(
    username: string,
    password: string
  ): Promise<void> {
    const { credential } =
      await FirebaseAuthentication.createUserWithEmailAndPassword({
        email: username,
        password: password,
      });
    if (Capacitor.isNativePlatform() && credential?.idToken) {
      if (credential.secret !== undefined) {
        signInWithEmailAndPassword(this.auth, username, password);
      }
    }
  }
  async LogInWithEmail(username: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, username, password);
  }

  async updateDisplayName(displayName: string): Promise<void> {
    if (!this.auth.currentUser) {
      return;
    }

    await updateProfile(this.auth.currentUser, {
      displayName,
    });
  }

  /**
   * Save the new user as an instance variable, and perform any necessary reroutes.
   *
   * @param user The new user.
   * @private
   */
  private async setCurrentUser(user: User | null): Promise<void> {
    this.currentUser.next(user);
    if (this.isLoggedIn()) {
      await this.router.navigate(['/home']);
    } else {
      await this.router.navigate(['/login']);
    }
  }
}
