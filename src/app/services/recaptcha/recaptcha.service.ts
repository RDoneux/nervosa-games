import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';
import { IGlobalVariables } from 'src/app/interfaces/i-global-variables.interface';
import { debug } from '../debug/debug';

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {
  private apiKey: string | undefined;
  private siteKey: string | undefined;

  constructor(
    private httpClient: HttpClient,
    private firestoreService: FirestoreService
  ) {
    this.firestoreService
      .getFirestore()
      .collection('siteData')
      .doc<IGlobalVariables>('globalVariables')
      .valueChanges()
      .subscribe({
        next: (globalVariables: IGlobalVariables | undefined) => {
          this.apiKey = globalVariables?.apiKey;
          this.siteKey = globalVariables?.recaptchaSiteKey;
        },
        error: (error: any) =>
          debug('error')(`error fetching global variables, ${error}`),
      });
  }

  public checkRecapthaKey(response: string): Observable<boolean> {
    if (!this.siteKey || !this.apiKey)
      debug('error')('There has been an error fetching the api or site key');

    return this.httpClient
      .post(
        `https://recaptchaenterprise.googleapis.com/v1/projects/nervosa-games/assessments?key=${this.apiKey}`,
        {
          event: {
            token: response,
            siteKey: this.siteKey,
          },
        }
      )
      .pipe(
        map((value: any) => value.tokenProperties.valid),
        tap((value: boolean) => {
          if (!value) debug('error')('Invalid Recapcha Key');
        }),
        filter((value: boolean) => {
          return value;
        })
      );
  }
}
