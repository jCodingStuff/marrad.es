import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { LanguageService } from '../language.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent {

  header: {[key: string]: string} = {
    'eng': '404 Error',
    'esp': 'Error 404',
    'cat': 'Error 404',
  }

  subtitle: {[key: string]: string} = {
    'eng': 'Page not found',
    'esp': 'Página no encontrada',
    'cat': 'Pàgina no trobada',
  }

  constructor (public langService: LanguageService) {}

}
