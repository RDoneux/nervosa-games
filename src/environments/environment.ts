import { TAPIRoot, TEnvironmentName } from './environment-names';
import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  firebase: {
    projectId: 'nervosa-games',
    appId: '1:630663851149:web:a646c4c5535990123b86c4',
    storageBucket: 'nervosa-games.appspot.com',
    apiKey: 'AIzaSyCXbEJlPpMWYxOFimUR3OxwD4xs9QM10Xo',
    authDomain: 'nervosa-games.firebaseapp.com',
    messagingSenderId: '630663851149',
    measurementId: 'G-6MPXZZQJGB',
  },
  debug: ['error'],
  siteKey: '6LdN-W0pAAAAAMySlu0NUzcilMMIfmJvYAeQTk2s',
  name: TEnvironmentName.PRODUCTION,
  apiRoot: TAPIRoot.PRODUCTION
};
