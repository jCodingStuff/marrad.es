import { Component } from '@angular/core';

import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { SUPPORTED_LANGS } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // Icons
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faLinkedin = faLinkedin;
  faGithub = faGithub;

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
