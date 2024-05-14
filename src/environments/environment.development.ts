import { TAPIRoot, TEnvironmentName } from './environment-names';
import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  firebase: {
    apiKey: 'AIzaSyBM208W8qXZZFTuyAoZ843VbOQfCCF0O7w',
    authDomain: 'nervosa-games-dev.firebaseapp.com',
    projectId: 'nervosa-games-dev',
    storageBucket: 'nervosa-games-dev.appspot.com',
    messagingSenderId: '784769661425',
    appId: '1:784769661425:web:078b02aeb20fb029cd2c50',
    measurementId: 'G-YE1Z6RJ81L',
  },
  debug: ['welcome', 'method-not-implemented', 'error', 'info'],
  siteKey: '6LdN-W0pAAAAAMySlu0NUzcilMMIfmJvYAeQTk2s',
  name: TEnvironmentName.DEVELOPMENT,
  apiRoot: TAPIRoot.DEVELOPMENT,
};
