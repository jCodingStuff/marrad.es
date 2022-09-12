import { Injectable } from '@angular/core';

import { SUPPORTED_LANGS } from './data';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  readonly supportedLangs = SUPPORTED_LANGS;

  language!: string;

  constructor() {
    this.language = this.supportedLangs[0];
  }
  
}
