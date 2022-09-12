import { Component } from '@angular/core';
import { LanguageService } from './language.service';

import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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

  constructor (public langService: LanguageService) {}

  /**
   * Set a new language for the website
   * @param language the language to set
   */
  setLanguage(language: string): void {
    this.langService.language = language;
  }

}
