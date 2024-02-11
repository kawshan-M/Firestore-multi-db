import { InjectionToken } from "@angular/core";
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { getApp } from "firebase/app";


export const FIRESTORE_CONFIG1 = new InjectionToken<Firestore>('firestore config 1', {
    providedIn: 'root',
    factory: () => getFirestore(getApp('[DEFAULT]'))
  });
  
  export const FIRESTORE_OTHER = new InjectionToken<Firestore>('firestore other', {
    providedIn: 'root',
    factory: () => getFirestore(getApp('[OTHER]'))
  });