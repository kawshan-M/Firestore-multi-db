// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripe: {
    publishableKey: 'pk_test_51OUR7RBnqdtkmq3AxtKQnk4UpR6kW34pzfJyGpfoIUNFr6DvkbUDYKJzKROguhCDGl1Rw4nuuaTQoq4ksoUhBksw00Uq6xcfRY',
    secretKey: 'sk_test_51OUR7RBnqdtkmq3ArhdsxxdKsL7esfugKRhvUEzNSWGaYrDvCLgrmbRUcOz5mvIM5usnAhUZf1fUXUpZslDRskQa007ogfSq2i'
  },
  api: 'https://us-central1-node-deploy-23b01.cloudfunctions.net/api/',
  firebaseConfig1 : {
    apiKey: "AIzaSyAFpMCzvF0JhWBQAi4TLrRLGgTuEz2gAKQ",
    authDomain: "todo-login-6f91f.firebaseapp.com",
    databaseURL: "https://todo-login-6f91f-default-rtdb.firebaseio.com",
    projectId: "todo-login-6f91f",
    storageBucket: "todo-login-6f91f.appspot.com",
    messagingSenderId: "52149119686",
    appId: "1:52149119686:web:f25a9ac7c90b26f859c5c7",
    measurementId: "G-T0LRN0KTYG"
  },
  firebaseConfig2 : {
    apiKey: "AIzaSyATO2xO01xMGBeXljt8l66TYmTyLq9BBwI",
    authDomain: "userdb-3448b.firebaseapp.com",
    projectId: "userdb-3448bs",
    storageBucket: "userdb-3448b.appspot.com",
    messagingSenderId: "963889293756",
    appId: "1:963889293756:web:16880e3908a70c9ab523b9",
    measurementId: "G-8LKN17RPWR"
  },
  accountOwnerEmail : 'winnimaleesha@gmail.com',
  accountOwnerPassword : 'FBB8FC88DB038D2F93A6566422CA949C25B1',
  emailHost: 'smtp.elasticemail.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
