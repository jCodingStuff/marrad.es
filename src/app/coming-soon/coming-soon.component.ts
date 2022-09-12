import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { LanguageService } from '../language.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ComingSoonComponent {

  csText: {[key: string]: string} = {
    'eng': 'Coming soon...',
    'esp': 'Próximamente...',
    'cat': 'Pròximament...'
  }

  constructor(public langService: LanguageService) { }

}
