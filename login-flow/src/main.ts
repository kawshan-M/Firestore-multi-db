import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from 'stripe-pwa-elements/loader';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => defineCustomElements(window))
  .catch(err => console.error(err));
  importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseConfig1, '[DEFAULT]'))),
  importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseConfig2, '[OTHER]'))),
  importProvidersFrom(provideFirestore(() => getFirestore()))