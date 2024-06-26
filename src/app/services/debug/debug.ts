import dbg from 'debug';
import packageJson from '../../../../package.json';
import { isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment';

/* istanbul ignore next */
export const debug = (namespace: string) =>
  dbg(`${packageJson?.name ?? 'DEFAULT'}:${namespace}`);

/* istanbul ignore next */
export function debugInit(): void {
  dbg.enable(
    environment.debug
      .map((namespace: string) => `${packageJson.name}:${namespace}`)
      .join(',')
  );
  const welcome = debug('welcome');
  welcome(`Name: ${packageJson.name}`);
  welcome(
    `Version: ${packageJson.version}
      `
  );
  welcome(`State: ${isDevMode() ? 'Development' : 'Production'}`);
}

