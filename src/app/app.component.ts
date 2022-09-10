import { Component } from '@angular/core';

import { SUPPORTED_LANGS } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  selectedLang: string = 'eng';
  languages: string[] = SUPPORTED_LANGS;

  /**
   * Set a new language for the website
   * @param language the language to set
   */
  setLanguage(language: string): void {
    this.selectedLang = language;
  }

}
